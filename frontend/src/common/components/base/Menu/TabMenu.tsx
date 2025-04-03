import { ReactNode, useEffect, useState } from "react";
import Button from '@/common/components/base/Button/Button';
import { useLocation, useNavigate } from "react-router-dom";

interface Props {
    tabs: { url: string, label: string }[]
    children: ReactNode[]
}

const TabMenu = ({ tabs, children }: Props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(tabs[0].url)

    const changeTab = (tabUrl: string) => {
        setActiveTab(tabUrl);
        navigate(`?tab=${tabUrl}`, { replace: true });
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const tabParam = queryParams.get('tab');
        const validTab = tabs.find(tab => tab.url === tabParam) ? tabParam : tabs[0].url;
        if (tabParam !== validTab) {
            navigate(`?tab=${validTab}`, { replace: true });
        }
        setActiveTab(validTab ?? tabs[0].url);
    }, [location, navigate, tabs]);

    return (
        <div>
            <ul className="flex border-b-0">
                {tabs.map((tab) => (
                    <li key={tab.url}>
                        <Button className={`inline-block py-2 px-4 shadow-none rounded-l-none rounded-r-none font-medium text-base ${activeTab === tab.url ? "bg-base-100 border-0 border-primary/30 text-primary pointer-events-none" : "border-0 bg-base-100/50 hover:bg-accent/15"} rounded`}
                            onClick={() => changeTab(tab.url)}>
                            {tab.label}
                        </Button>
                    </li>
                ))}
            </ul>
            {children[tabs.findIndex(tab => tab.url === activeTab)]}
        </div>
    );
}

export default TabMenu