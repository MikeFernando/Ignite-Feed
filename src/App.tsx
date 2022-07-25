import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Post } from "./components/Post";

import styles from './styles/App.module.css';

import './global.css';

const posts = [
    {
        id: 1,
        author: {
            name: 'Mike Fernando',
            role: 'Web Developer',
            avatarUrl: 'https://github.com/MikeFernando.png'
        },
        content: [
            { type: 'paragraphy', content: 'Fala galeraa 👋' },
            { type: 'paragraphy', content: 'Finalmente finalizei meu novo site/portfólio. Foi um baita desafio criar todo o design e codar na unha, mas consegui 💪🏻' },
            { type: 'link', content: 'https://www.mikefernando.com/' }
        ],
        publishedAt: new Date('2022-07-17 15:28:00')
    },
    {
        id: 2,
        author: {
            name: 'Diego Fernandes',
            role: 'CTO @Rocketseat',
            avatarUrl: 'https://github.com/diego3g.png'
        },
        content: [
            { type: 'paragraphy', content: 'Fala galeraa 👋' },
            { type: 'paragraphy', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀' },
            { type: 'link', content: 'devonlane.design' }
        ],
        publishedAt: new Date('2022-07-18 10:00:00')
    }
];

export function App() {
  return (
    <div className="App">
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
            {posts.map(post => {
                return (
                    <Post
                        key={post.id}
                        author={post.author}
                        content={post.content}
                        publishedAt={post.publishedAt}
                    />
                )
            })}
        </main>
      </div>
    </div>
  )
}


