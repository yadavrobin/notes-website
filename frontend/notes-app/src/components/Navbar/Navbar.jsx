import React from 'react';
import ProfileInfo from '../Cards/ProfileInfo';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery('');
    handleClearSearch();
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-3 shadow-md sticky top-0 z-50">
      {/* Logo or Title */}
      <h2 className="text-2xl font-semibold text-gray-800">Notes</h2>
      
      {/* Search Bar */}
      <div className="flex-1 mx-6">
        <SearchBar
          value={searchQuery}
          onChange={({ target }) => setSearchQuery(target.value)}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />
      </div>

      {/* Profile Information */}
      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  );
};

export default Navbar;
