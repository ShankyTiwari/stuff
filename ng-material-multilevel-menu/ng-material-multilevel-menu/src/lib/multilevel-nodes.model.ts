export interface MultilevelNodes {
    id: string;
    label: string;
    faIcon?: string;
    icon?: string;
    hidden?: boolean;
    link?: string;
    expanded?: boolean;
    finalNode?: boolean;
    items?: MultilevelNodes[];
}
