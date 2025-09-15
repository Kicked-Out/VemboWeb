import React from "react";
import { cn } from "../../lib/utils";
import "../../styles/settings/components/avatar.css";
import editIcon from "../../assets/edit.png";

type AvatarProps = {
  alt?: string;
  onEdit?: () => void;
  size?: number;
  className?: string;
};

const Avatar: React.FC<AvatarProps> = ({
  alt = "avatar",
  onEdit,
  size = 96,
  className = "",
}) => {
  return (
    <div
      className={cn("avatar-wrapper", className)}
      style={{ width: size, height: 80 }}
    >
      <div className="avatar-img">
        <img alt={alt} />
      </div>

      {onEdit && (
        <button
          type="button"
          className="avatar-edit-btn"
          onClick={onEdit}
          aria-label="Edit avatar"
          title="Edit avatar"
        >
          <img src={editIcon} alt="edit" />
        </button>
      )}
    </div>
  );
};

export default Avatar;