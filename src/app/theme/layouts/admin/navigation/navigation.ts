export interface NavigationItem {
    id: string;
    title: string;
    type: 'item' | 'collapse' | 'group';
    translate?: string;
    icon?: string;
    hidden?: boolean;
    url?: string;
    classes?: string;
    exactMatch?: boolean;
    external?: boolean;
    target?: boolean;
    breadcrumbs?: boolean;
    badge?: {
        title?: string;
        type?: string;
    };
    children?: NavigationItem[];
}

// Lưu ý: external = true --> sẽ tải lại trang

export const NavigationItems: NavigationItem[] = [
    {
        id: 'manager',
        title: 'manager',
        type: 'group',
        icon: 'icon-group',
        children: [
            {
                id: 'dashboard',
                title: 'Dashboard',
                type: 'item',
                url: '/dashboard',
                icon: 'feather icon-home'
            },
            {
                id: 'cua-hang',
                title: 'Cửa hàng',
                type: 'collapse',
                icon: 'fas fa-store',
                children: [
                    {
                        id: 'chi-tiet-cua-hang',
                        title: 'Danh sách',
                        type: 'item',
                        url: '#',
                        icon: 'fas fa-list-ul'
                    }
                ]
            },
            {
                id: 'san-pham',
                title: 'Sản phẩm',
                type: 'collapse',
                icon: 'fas fa-cube',
                children: [
                    {
                        id: 'danh-sach-san-pham',
                        title: 'Danh sách',
                        type: 'item',
                        url: '/food',
                        icon: 'fas fa-list-ul'
                    },
                    {
                        id: 'them-san-pham',
                        title: 'Thêm sản phẩm',
                        type: 'item',
                        url: '#',
                        icon: 'fas fa-plus-circle'
                    }
                ]
            },
            {
                id: 'don-hang',
                title: 'Đơn hàng',
                type: 'item',
                url: '#',
                icon: 'fas fa-shopping-basket'
            },
            {
                id: 'hoa-don',
                title: 'Hoá đơn',
                type: 'collapse',
                icon: 'fas fa-file-invoice',
                children: [
                    {
                        id: 'chi-tiet-hoa-don',
                        title: 'Chi tiết',
                        type: 'item',
                        url: '#',
                        icon: 'fas fa-file-alt'
                    },
                    {
                        id: 'thong-ke-hoa-don',
                        title: 'Thống kê',
                        type: 'item',
                        url: '#',
                        icon: 'fas fa-chart-bar'
                    }
                ]
            }
        ]
    },
    {
        id: 'chart',
        title: 'chart',
        type: 'group',
        icon: 'icon-group',
        children: [
            {
                id: 'doanh-thu',
                title: 'Doanh thu',
                type: 'collapse',
                icon: 'fas fa-chart-line',
                children: [
                    {
                        id: 'doanh-thu-theo-thang',
                        title: 'Theo tháng',
                        type: 'item',
                        url: '#',
                        icon: 'fas fa-calendar-alt'
                    },
                    {
                        id: 'doanh-thu-theo-nam',
                        title: 'Theo năm',
                        type: 'item',
                        url: '#',
                        icon: 'fas fa-dollar-sign'
                    }
                ]
            },
        ]
    },
    {
        id: 'other',
        title: 'other',
        type: 'group',
        icon: 'icon-group',
        children: [
            {
                id: 'sample-page',
                title: 'Sample page',
                type: 'item',
                url: '#',
                icon: 'fas fa-file'
            }
        ]
    }
];
