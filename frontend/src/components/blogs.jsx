import React from 'react';
import './blogs.css';

const BLOGS = [
  {
    title: 'Blog 1',
    url: 'https://blog.practo.com/millennial-women-drive-rise-in-gynecology-consultations-practo-insights/', 
  },
  {
    title: 'Blog 2',
    url: 'https://www.elcaminohealth.org/stay-healthy/blog/preventing-and-managing-diabetes', 
  },
  {
    title: 'Blog 3',
    url: 'https://www.elcaminohealth.org/stay-healthy/blog/summer-health-tips', 
  },
  {
    title: 'Blog 4',
    url: 'https://www.elcaminohealth.org/stay-healthy/blog/gentlemen-call-your-doctor',
  },
];

const Blogs = () => {
  return (
    <div className="blogs-wrapper">
      <header className="blogs-header">
        <h2 className="blogs-title">If you are Reading Enthusiast , You can Explore this Section as well !</h2>
        <h1 className="blogs-title">Blogs</h1>
        <p className="blogs-subtitle">
          A clean, minimal reading wall. View posts directly on this page.
        </p>
      </header>

      <main className="blogs-content">
        <section className="blogs-grid">
          {BLOGS.map((b, idx) => (
            <article key={idx} className="blogs-card">
              <div className="blogs-card-head">
                <h2 className="blogs-card-title">{b.title}</h2>
                <span className="blogs-chip">health blogs</span>
              </div>

              <div className="blogs-frame-wrap">
                <iframe
                  src={b.url}
                  title={b.title}
                  className="blogs-iframe"
                  loading="lazy"
                  frameBorder="0"
                  sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                />
              </div>

              <div className="blogs-actions">
                <a href={b.url} target="_blank" rel="noreferrer" className="blogs-link">
                  Open in new tab
                </a>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Blogs;
