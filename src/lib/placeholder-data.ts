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
        id: '1',
        name: 'Magnet Neodymium',
        image: [
            {
                url: '/category/magnets.webp',
                public_id: 'category/magnets'
            },
            {
                url: '/category/magnet_separator.webp',
                public_id: 'category/magnet_separator'
            },
            {
                url: '/category/magnet_conveyor.webp',
                public_id: 'category/magnet_conveyor'
            },
            {
                url: '/category/magnet_accessoris.webp',
                public_id: 'category/magnet_accessoris'
            }
        ],
        desc: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
    },
    {
        id: '2',
        name: 'Magnetic Separator',
        image: [
            {
                url: '/category/magnet_separator.webp',
                public_id: 'category/magnet_separator'
            }
        ],
        desc: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
    },
    {
        id: '3',
        name: 'Magnetic Conveyor',
        image: [
            {
                url: '/category/magnet_conveyor.webp',
                public_id: 'category/magnet_conveyor'
            }
        ],
        desc: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
    },
    {
        id: '4',
        name: 'Magnetic Accessoris',
        image: [
            {
                url: '/category/magnet_accessoris.webp',
                public_id: 'category/magnet_accessoris'
            }
        ],
        desc: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
    }
];

export { ProductCategories, TopProducts }