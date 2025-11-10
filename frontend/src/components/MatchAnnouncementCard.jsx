import React from "react";
import { Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MatchAnnouncementCard = ({ announcement, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-md border-2 border-gray-200 transition-all hover:shadow-lg">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-bold text-lg text-gray-900">
              ID #{announcement.match_id}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Created: {new Date(announcement.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Title */}
        <div className="mb-3">
          <p className="text-sm font-medium text-gray-700 italic">
            {announcement.title}
          </p>
        </div>

        {/* Message */}
        <div className="mb-4">
          <p className="text-xs text-gray-600 font-semibold mb-1">RESULT:</p>
          <p className="text-sm text-gray-600 italic">{announcement.message}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() =>
              navigate(`/match-announcements/edit/${announcement._id}`)
            }
            className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            <Edit size={14} />
            <span>Edit</span>
          </button>
          <button
            onClick={() => onDelete(announcement._id, announcement.match_id)}
            className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchAnnouncementCard;
