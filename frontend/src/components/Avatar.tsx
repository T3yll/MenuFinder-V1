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
    const [avatarUrl, setAvatarUrl] = useState<string>('/public/default.png');

    useEffect(() => {
        const fetchAvatar = async () => {
            try {
                setAvatarUrl("/"+await getPath(fileId.toString()));
                console.log('Avatar URL:', avatarUrl);
            } catch (error) {
                console.error('Error fetching avatar:', error);
            }
        };

        fetchAvatar();
    }, [fileId]);

    return (
       <div className="avatar">
                    <img src={avatarUrl} alt="Avatar utilisateur" />
        </div>
    );
}

export default CustomAvatar;