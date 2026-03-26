import { authClient } from "./lib/auth-client";
import { UserAvatar } from "./components/UserAvatar";
import "./App.css";

function App() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="auth-center">
        <p>読み込み中...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="auth-center">
        <div className="auth-card">
          <h1>KMC Platform</h1>
          <p>kamiyama.ac.jp アカウントでログインしてください</p>
          <button
            className="google-signin"
            onClick={() =>
              authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
              })
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="20"
              height="20"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              />
            </svg>
            Google でログイン
          </button>
        </div>
      </div>
    );
  }

  const user = session.user as unknown as {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    role: string;
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>KMC Platform</h1>
        <div className="user-info">
          <UserAvatar name={user.name} image={user.image} role={user.role} />
          <div className="user-details">
            <span className="user-name">{user.name}</span>
            <span className="user-role">{user.role}</span>
          </div>
          <button
            className="signout-btn"
            onClick={() => authClient.signOut()}
          >
            ログアウト
          </button>
        </div>
      </header>
      <main>
        <p>ようこそ、{user.name} さん</p>
      </main>
    </div>
  );
}

export default App;
