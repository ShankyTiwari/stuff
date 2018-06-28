export interface MultilevelNodes {
    label: string;
    faIcon?: string;
    icon?: string;
    hidden?: boolean;
    link?: string;
    expanded?: boolean;
    selected?: boolean;
    finalNode?: boolean;
    items?: MultilevelNodes[];
}
