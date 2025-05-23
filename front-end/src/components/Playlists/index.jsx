import React from 'react';
import styles from './Playlists.module.css';

const playlistsMock = [
  {
    id: 1,
    title: 'Aventura',
    videos: [
      {
        id: 'v1',
        title: 'Explorando o Desconhecido',
        thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'v2',
        title: 'Viagem no Tempo',
        thumbnail: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31?auto=format&fit=crop&w=400&q=80'
      },
    ]
  },
  {
    id: 2,
    title: 'Comédia',
    videos: [
      {
        id: 'v3',
        title: 'Risadas Garantidas',
        thumbnail: 'https://images.unsplash.com/photo-1542206395-9feb3edaa68f?auto=format&fit=crop&w=400&q=80'
      }
    ]
  }
];

export default function Playlists() {
  return (
    <div className={styles.playlists}>
      {playlistsMock.map(playlist => (
        <section key={playlist.id} className={styles.playlist}>
          <h2 className={styles.title}>{playlist.title}</h2>
          <div className={styles.videos}>
            {playlist.videos.map(video => (
              <div key={video.id} className={styles.videoCard}>
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className={styles.thumbnail}
                />
                <p className={styles.videoTitle}>{video.title}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
