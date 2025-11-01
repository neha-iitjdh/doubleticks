import { memo } from 'react';
import { UserIcon } from '../assets/icons';
import { formatDate } from '../utils/helpers';
import avatarImg from '../assets/avatar.svg';

// Individual customer row component (memoized for performance)
export const CustomerRow = memo(({ customer, style }) => {
  return (
    <div className="customer-row" style={style}>
      <div>
        <input type="checkbox" className="customer-row__checkbox" />
      </div>
      
      <div className="customer-row__info">
        <img src={avatarImg} alt="Avatar" className="customer-row__avatar" />
        <div className="customer-row__details">
          <div className="customer-row__name">{customer.name}</div>
          <div className="customer-row__phone">{customer.phone}</div>
        </div>
      </div>
      
      <div className="customer-row__score">{customer.score}</div>
      
      <div className="customer-row__email">{customer.email}</div>
      
      <div className="customer-row__date">{formatDate(customer.lastMessageAt)}</div>
      
      <div className="customer-row__added-by">
        <UserIcon className="customer-row__user-icon" />
        <span>{customer.addedBy}</span>
      </div>
    </div>
  );
});

CustomerRow.displayName = 'CustomerRow';
