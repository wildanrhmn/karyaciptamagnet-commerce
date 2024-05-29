import { IProduct } from "../../@types/definition";

const ProductCategories = [
    {
        categoryName: "Magnet",
        hasProduct: true,
        products: [
            { productName: "Neodymium Magnet" },
            { productName: "Pot Magnet" },
            { productName: "Rubber Coated Magnet" },
            { productName: "Electro Magnet" },
            { productName: "Flexible Magnet" }
        ]
    },
    {
        categoryName: "Magnetic Separator",
        hasProduct: true,
        products: [
            { productName: "Rod Magnet" },
            { productName: "Grate Magnet" },
            { productName: "Drawer Magnetic Separator" },
            { productName: "Self-Cleaning Drawer Magnetic Separator" },
            { productName: "Rotary Magnetic Separator" },
            { productName: "Liquid Magnetic Filter" },
            { productName: "Automatic Liquid Magnetic Separator" },
            { productName: "Wet Drum Separator" },
            { productName: "Drum Magnetic Separator" },
            { productName: "Plate Magnets" },
            { productName: "Suspended Magnetic Separator" },
            { productName: "Magnetic Pulley" },
            { productName: "High Intensity Magnetic Roll Separator" },
            { productName: "Electromagnetic Separator For Fine Powders" },
            { productName: "Electromagnetic Separator For Iron Ore" }
        ]
    },
    {
        categoryName: "Eddy Current Separator",
        hasProduct: false,
        products: []
    },
    {
        categoryName: "Magnetic Conveyor",
        hasProduct: false,
        products: []
    }
];

const TopProducts: IProduct[] = [
    {
        name: 'Magnet Neodymium',
        image: [
            {
                url: '/category/magnets.webp',
                public_id: 'category/magnets'
            }
        ]
    },
    {
        name: 'Magnetic Separator',
        image: [
            {
                url: '/category/magnet_separator.webp',
                public_id: 'category/magnet_separator'
            }
        ]
    },
    {
        name: 'Magnetic Conveyor',
        image: [
            {
                url: '/category/magnet_conveyor.webp',
                public_id: 'category/magnet_conveyor'
            }
        ]
    },
    {
        name: 'Magnetic Accessoris',
        image: [
            {
                url: '/category/magnet_accessoris.webp',
                public_id: 'category/magnet_accessoris'
            }
        ]
    }
];

export { ProductCategories, TopProducts }