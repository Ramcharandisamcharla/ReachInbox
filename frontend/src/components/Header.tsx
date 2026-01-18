export default function Header() {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="flex justify-between items-center p-4 border-b">
      <h1 className="font-bold">ReachInbox</h1>
      <button onClick={logout} className="text-sm text-red-600">
        Logout
      </button>
    </div>
  );
}