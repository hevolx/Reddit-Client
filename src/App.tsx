import { useState, useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchPosts } from './features/posts/postsSlice';
import type { Post } from './features/posts/postsSlice';
import { selectPostsStatus, selectPostsError } from './features/posts/postsSelectors';
import { selectFilteredPosts } from './features/search/selectFilteredPosts';
import { fetchComments, selectCommentsForPost } from './features/comments/commentsSlice';
import { setQuery, setCategory } from './features/search/filterSlice';
import { SearchInput } from './features/search/SearchInput';
import { FilterChips } from './features/search/FilterChips';
import { PostsList } from './features/posts/PostsList';
import { PostDetail } from './features/posts/PostDetail';
import { Modal } from './components/Modal';
import { useUrlSync } from './features/search/useUrlSync';

const CATEGORIES = [
  { id: 'popular',     label: 'Popular' },
  { id: 'programming', label: 'Programming' },
  { id: 'worldnews',   label: 'World News' },
  { id: 'gaming',      label: 'Gaming' },
  { id: 'science',     label: 'Science' },
  { id: 'technology',  label: 'Technology' },
  { id: 'funny',       label: 'Funny' },
  { id: 'movies',      label: 'Movies' },
  { id: 'music',       label: 'Music' },
  { id: 'askreddit',   label: 'Ask Reddit' },
];

function App() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectPostsStatus);
  const error  = useAppSelector(selectPostsError);
  const query    = useAppSelector((s) => s.filter.query);
  const category = useAppSelector((s) => s.filter.category);
  const filteredPosts = useAppSelector((s) => selectFilteredPosts(s));

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const commentsStatus = useAppSelector((s) =>
    selectedPost ? s.comments.statusByPostId[selectedPost.id] : undefined
  );
  const comments = useAppSelector((s) =>
    selectedPost ? selectCommentsForPost(s, selectedPost.id) : []
  );

  useUrlSync();

  useEffect(() => {
    dispatch(fetchPosts(category === 'popular' || !category ? 'popular' : category));
  }, [category, dispatch]);

  useEffect(() => {
    if (selectedPost) {
      dispatch(fetchComments({ postId: selectedPost.id, permalink: selectedPost.permalink }));
    }
  }, [selectedPost, dispatch]);

  const handleSelectPost  = useCallback((post: Post) => setSelectedPost(post), []);
  const handleCloseModal  = useCallback(() => setSelectedPost(null), []);
  const handleRetry       = useCallback(() => {
    dispatch(fetchPosts(category === 'popular' || !category ? 'popular' : category));
  }, [category, dispatch]);

  const activeChip = category ?? 'popular';

  const handleGoHome = useCallback(() => {
    dispatch(setCategory(null));
    dispatch(setQuery(''));
    setSelectedPost(null);
  }, [dispatch]);

  return (
    <div className="app">
      <header className="header" role="banner">
        <div className="header-inner">
          <div 
            className="logo" 
            aria-label="Go to start page"
            role="button"
            tabIndex={0}
            onClick={handleGoHome}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleGoHome();
              }
            }}
            style={{ cursor: 'pointer' }}
          >
            <div className="logo-icon">r/</div>
            <span className="logo-text">reddit</span>
          </div>
          <div className="search-wrapper">
            <SearchInput value={query} onChange={(q) => dispatch(setQuery(q))} />
          </div>
        </div>
      </header>

      <nav className="subreddit-bar" aria-label="Subreddit filters" data-testid="filter-chips">
        <div className="subreddit-bar-inner">
          <FilterChips
            categories={CATEGORIES}
            activeId={activeChip}
            onSelect={(id) =>
              dispatch(setCategory(id === 'popular' ? null : id === category ? null : id))
            }
          />
        </div>
      </nav>

      <main className="main">
        <div className="feed">
          <PostsList
            status={status}
            posts={filteredPosts}
            error={error}
            onRetry={handleRetry}
            onSelect={handleSelectPost}
          />
        </div>
      </main>

      {selectedPost && (
        <Modal label={selectedPost.title} onClose={handleCloseModal}>
          <PostDetail
            post={selectedPost}
            status={commentsStatus}
            comments={comments}
          />
        </Modal>
      )}
    </div>
  );
}

export default App;
