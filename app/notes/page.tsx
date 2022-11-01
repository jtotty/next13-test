import Link from 'next/link';
import styles from './Notes.module.css';
import CreateNote from './CreateNote';

async function getNotes() {
  const url = new URL('http://127.0.0.1:8090/api/collections/notes/records');
  url.searchParams.append('page', '1');
  url.searchParams.append('perPage', '30');

  const res = await fetch(url, { cache: 'no-store' });
  const data = await res.json();
  return data?.items as any[];
}

export default async function NotesPage() {
  const notes = await getNotes();

  return (
    <div>
      <h1>Notes</h1>
      <div>
        {notes?.map((note) => {
          return <Note key={note.id} note={note} />
        })}
      </div>

      <CreateNote />
    </div>
  );
}

function Note({ note }: any) {
  const { id, title, field, created } = note || {};

  return (
    <Link href={`/notes/${id}`}>
      <div className={styles.note}>
        <h2>{title}</h2>
        <h5>{field}</h5>
        <p>{created}</p>
      </div>
    </Link>
  );
}
