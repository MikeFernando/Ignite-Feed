import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

import { Avatar } from './Avatar';
import { Comment } from './Comment';

import styles from '../styles/Post.module.css';

interface Content {
    type: 'paragraphy' | 'link';
    content: string;
}

interface PostProps {
    author: {
        name: string;
        role: string;
        avatarUrl: string;
    };
    publishedAt: Date;
    content: Content[];
}

export function Post({ author, publishedAt, content }: PostProps) {
    const [ comments, setComments ] = useState([  'Muito bacana, hein!' ]);
    const [ newCommentText, setNewCommentText ] = useState('');

    const publishedDateFormatted = format(publishedAt, "d ' de ' LLLL ' às ' HH:mm'h'", { locale: ptBR });
    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true
    });
    const isNewCommentEmpty = newCommentText.length === 0;

    function handleCreateNewComment(event: FormEvent) {
        event.preventDefault()

        setComments([...comments, newCommentText]);
        setNewCommentText('');
    }

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('')
        setNewCommentText(event.target.value)
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('Este campo é obrigatório.')
    }

    function deleteComment(commentDeleted: string) {
        const viewListWithoutDeletedComment = comments.filter(comment => {
            return comment !== commentDeleted;
        });

        setComments(viewListWithoutDeletedComment);
    }

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={author.avatarUrl} />

                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>

                <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
                    {publishedDateRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>
                {content.map(line => {
                    switch (line.type) {
                        case 'paragraphy':
                            return <p key={line.content}>{line.content}</p>

                        case 'link':
                            return <p key={line.content}><a href={line.content}>{line.content}</a></p>    
                    }
                })}
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>
                <textarea
                  value={newCommentText}
                  placeholder='Deixei seu comentário'
                  onChange={handleNewCommentChange}
                  onInvalid={handleNewCommentInvalid}
                  required
                />

                <footer>
                    <button type="submit" disabled={isNewCommentEmpty}>
                        Publicar
                    </button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comment => {
                    return (
                        <Comment 
                            key={comment} 
                            content={comment}
                            onDeleteComment={deleteComment}
                        />
                    )
                })}
            </div>
        </article>
    )
}
