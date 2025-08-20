import React from "react";

const NavItem = ({ item, active, onClick, hasSubItems = false, isExpanded = false }) => {
  return (
    <div
      className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer mb-1 transition-all duration-200
        ${active 
          ? "bg-blue-100 text-blue-600 font-medium" 
          : "hover:bg-gray-100 text-gray-700"
        }
        ${hasSubItems ? "justify-between" : ""}
      `}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-expanded={hasSubItems ? isExpanded : undefined}
      aria-current={active ? 'page' : undefined}
    >
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <span className={`flex-shrink-0 ${active ? "text-blue-600" : "text-gray-500"}`}>
          {React.cloneElement(item.icon, { 
            size: 20,
            "aria-hidden": "true" 
          })}
        </span>
        <span className="truncate text-sm md:text-base">{item.label}</span>
      </div>
      
      {hasSubItems && (
        <span 
          className="flex-shrink-0 text-gray-400 transition-transform duration-200"
          aria-hidden="true"
        >
          {isExpanded ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          )}
        </span>
      )}
    </div>
  );
};

export default NavItem;