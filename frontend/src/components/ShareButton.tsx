import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from "react";
import { useAppDispatch } from '../hooks/storeToast';
import { showToast } from '../store/slice/toastSlice';


interface ShareButtonProps {
  text: string;
  url: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ text, url }) => {
  const [shareNow, setShareNow] = useState(false);
  const message = encodeURIComponent(`${text} ${url}`);

  // Social media share handlers
  const handleWhatsAppShare = () => {
    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

  const handleMessengerShare = () => {
    window.open(
      `fb-messenger://share/?link=${encodeURIComponent(url)}&app_id=YOUR_APP_ID`,
      "_blank"
    );
  };

  const handleTwitterShare = () => {
    window.open(`https://twitter.com/intent/tweet?text=${message}`, "_blank");
  };

  const handleLinkedInShare = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
      "_blank"
    );
  };
  const dispatch = useAppDispatch();

  // Clipboard functionality
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
        // Optionally, you can show a toast or notification here
        dispatch(showToast({
                    message: 'copié dans le presse-papiers',
                    severity: 'info'
                  }));
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div>
      {/* Main Share Button */}
       <button 
        onClick={() => handleCopy()}
        style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
        className="share-button action-button"
    >
        <FontAwesomeIcon icon={faShareNodes} />
            Partager
            </button>
     </div>
  );
};

export default ShareButton;