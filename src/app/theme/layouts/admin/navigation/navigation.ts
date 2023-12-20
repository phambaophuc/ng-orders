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
        title: 'Quản lý',
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
                type: 'item',
                url: '/shop',
                icon: 'fas fa-store'
            },
            {
                id: 'san-pham',
                title: 'Sản phẩm',
                type: 'item',
                url: '/food',
                icon: 'fas fa-cube'
            },
            {
                id: 'don-hang',
                title: 'Đơn hàng',
                type: 'item',
                url: '/order',
                icon: 'fas fa-shopping-basket'
            },
            {
                id: 'hoa-don',
                title: 'Hoá đơn',
                type: 'item',
                icon: 'fas fa-file-invoice',
                url: '/invoice'
            }
        ]
    },
    {
        id: 'other',
        title: 'other',
        type: 'group',
        icon: 'icon-group',
        children: [
            {
                id: 'voucher',
                title: 'Voucher',
                type: 'collapse',
                icon: 'fas fa-tag',
                children: [
                    {
                        id: 'list-voucher',
                        title: 'Vouchers',
                        type: 'item',
                        icon: 'fas fa-ticket-alt',
                        url: '/voucher'
                    },
                    {
                        id: 'add-voucher',
                        title: 'Tạo Voucher',
                        type: 'item',
                        icon: 'fas fa-plus',
                        url: '/voucher/create'
                    }
                ]
            }
        ]
    },
    {
        id: 'chart',
        title: 'biểu đồ',
        type: 'group',
        icon: 'icon-group',
        children: [
            {
                id: 'doanh-thu',
                title: 'Doanh thu',
                type: 'item',
                icon: 'fas fa-chart-line',
                url: '/chart'
            },
        ]
    }
];

export const NavigationItemsAdmin: NavigationItem[] = [
    {
        id: 'admin',
        title: 'admin',
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
                id: 'account',
                title: 'Tài khoản',
                type: 'item',
                url: '/a/account',
                icon: 'fas fa-user-circle'
            },
            {
                id: 'shop',
                title: 'Cửa hàng',
                type: 'item',
                url: '/shop',
                icon: 'fas fa-store'
            }
        ]
    },
    {
        id: 'other',
        title: 'other',
        type: 'group',
        icon: 'icon-group',
        children: [
            {
                id: 'messages',
                title: 'Nhắn tin',
                type: 'item',
                url: '/a/messages',
                icon: 'fas fa-comments'
            }
        ]
    }
];