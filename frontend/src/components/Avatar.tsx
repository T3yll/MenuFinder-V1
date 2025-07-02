import exp from "constants";
import { useState, useEffect } from "react";
import { getPath } from "../services/file.service";
import '../styles/components/Avatar.scss';


export interface AvatarProps {
    fileId: number;
    size?: number;
    className?: string;
    }

 const CustomAvatar: React.FC<AvatarProps> = ({ fileId, className }) => {
    const [avatarUrl, setAvatarUrl] = useState<string>('/default.png');

    useEffect(() => {
        const fetchAvatar = async () => {
            try {
                const url = "/" + await getPath(fileId.toString());
                setAvatarUrl(url);
                console.log('Avatar URL:', url);
            } catch (error) {
                console.error('Error fetching avatar:', error);
                setAvatarUrl('/default.png');
            }
        };

        if (fileId) {
            fetchAvatar();
        } else {
            setAvatarUrl('/default.png');
        }
    }, [fileId]);

    return (
        <div className="avatar">
            <img src={avatarUrl} alt="Avatar utilisateur" className={className} />
        </div>
    );
}

export default CustomAvatar;