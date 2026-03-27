import { useAuth } from "./hooks/useAuth";
import { UserAvatar } from "./components/UserAvatar";
import { LoginPage } from "./(auth)/login";
import { supabase } from "./lib/supabase";
import "./App.css";

function App() {
  const { user, loading, authError } = useAuth();

  if (loading) {
    return (
      <div className="auth-center">
        <p>読み込み中...</p>
      </div>
    );
  }

  if (!user) {
    return <LoginPage error={authError} />;
  }

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
            onClick={() => supabase.auth.signOut()}
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
