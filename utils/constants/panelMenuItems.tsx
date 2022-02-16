import { Group } from '@mui/icons-material';
import { ReactElement } from 'react';

export interface IPanelManuItem {
    text: string,
    link: string,
    icon: ReactElement
}

export const PANEL_MENU_ITEMS_ADMIN: IPanelManuItem[] = [
    {
        text: 'users',
        link: 'users',
        icon: <Group />,
    }
] 