const products = [
    //Conos Personales
    //^PONER UN SEUDONOMBRE PORQUE LAS HAMBURGUESAS SE LLAMAN BURGER Y EL USUARIO LAS BUSCARA COMO HAMBURGUESA/S
    {
        code: "CP-10-101",
        name: "Cono La Justa",
        pseudoName: "",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1684108759/images/lskbig4iygzshkpfaaiq.jpg", //------
        description: "300gr de papas nativas + cremas a elección",
        category: "Conos Personales",
        price: 8
    },
    {
        code: "CP-10-102",
        name: "Cono La Peque",
        pseudoName: "",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1684109380/images/xablhj5vjuqw6ud1csif.jpg", //------
        description: "250gr de papas nativas + cremas a elección",
        category: "Conos Personales",
        price: 6
    },
    {
        code: "CP-10-103",
        name: "Cono La Rebosante",
        pseudoName: "",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1684109379/images/txte0sk6ksttf9gywpuj.jpg", //----------
        description: "350gr de papas nativas + cremas a elección",
        category: "Conos Personales",
        price: 9
    },

    //Snacks
    {
        code: "SN-20-104",
        name: "Salchi Wanka",
        pseudoName: "",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1683664481/images/iknnkqakucnnnxt54ve5.jpg",
        description: "Salchicha + chorizo parrillero + papas nativas + chicha morada, maracuyá o emoliente de 16 oz + cremas a elección",
        category: "Snacks",
        price: 16.9
    },
    {
        code: "SN-20-105",
        name: "Snack Alitas a la Maracuyá",
        pseudoName: "",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1684109379/images/aewwbiqg7qbwohlnmdwk.jpg", //-------------
        description: "Alitas de pollo + salsa de maracuyá + papas nativas + chicha morada, maracuyá o emoliente de 16 oz + cremas a elección",
        category: "Snacks",
        price: 23.9
    },
    {
        code: "SN-20-106",
        name: "Snack Alitas Acevichadas",
        pseudoName: "",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1683664515/images/vxq1zwwa8fwzgcjbhao1.jpg",
        description: "Alitas de pollo + salsa acevichada + papas nativas + chicha morada, maracuyá o emoliente de 16 oz + cremas a elección",
        category: "Snacks",
        price: 22.9
    },
    {
        code: "SN-20-107",
        name: "Snack Alitas BBQ",
        pseudoName: "",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1683664550/images/iqypns1lcenfygelpgmm.jpg",
        description: "Alitas de pollo + salsa BBQ + papas nativas + chicha morada, maracuyá o emoliente de 16 oz + cremas a eleección",
        category: "Snacks",
        price: 22.9
    },
    {
        code: "SN-20-108",
        name: "Snack Alitas Broaster",
        pseudoName: "",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1683664584/images/imygmjgdbjpiq2patz2i.jpg",
        description: "Alitas broaster + papas nativas + chicha morada, maracuyá o emoliente de 16 oz + cremas a elección",
        category: "Snacks",
        price: 22.9
    },
    {
        code: "SN-20-109",
        name: "Snack Alitas Búfalo",
        pseudoName: "",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1683664624/images/epdev7bnryiyka7ld4fd.jpg",
        description: "Alitas de pollo + salsa búfalo + papas nativas + chicha morada, maracuyá o emoliente de 16 oz + cremas a elección",
        category: "Snacks",
        price: 22.9
    },
    {
        code: "SN-20-110",
        name: "Snack Alitas en Salsa Teriyaki",
        pseudoName: "",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1683664667/images/g2l8lz8sogan2grxcnut.jpg",
        description: "Alitas de pollo + salsa teriyaki + papas nativas + chicha morada, maracuyá o emoliente de 16 oz + cremas a elección",
        category: "Snacks",
        price: 22.9
    },
    {
        code: "SN-20-111",
        name: "Snack Alitas Hot",
        pseudoName: "",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1683664709/images/ddfrs3gkuipsufirrhcl.jpg",
        description: "Alitas picantes + papas nativas + chicha morada, maracuyá o emoliente de 16 oz + cremas a elección",
        category: "Snacks",
        price: 22.9
    },
    {
        code: "SN-20-112",
        name: "Snack Mixto",
        pseudoName: "",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1683664750/images/mv59mdhuj8x2izeyczcu.jpg",
        description: "Alitas BBQ + tiras de pollo + salsa BBQ + papas nativas + chicha morada, maracuyá o emoliente de 16 oz + cremas a elección",
        category: "Snacks",
        price: 20.9
    },
    {
        code: "SN-20-113",
        name: "Snack Mollejitas",
        pseudoName: "",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1683664750/images/mv59mdhuj8x2izeyczcu.jpg",
        description: "Mollejitas salteadas + mote + papas nativas + chicha morada, maracuyá o emoliente de 16 oz + cremas a elección",
        category: "Snacks",
        price: 18.9
    },
    {
        code: "SN-20-114",
        name: "Snack Wanka BBQ",
        pseudoName: "",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1683664819/images/vjozfjwglpesbenuzfxf.jpg",
        description: "Tiras de pollo + salsa BBQ + papas nativas + chicha morada, maracuyá o emoliente de 16 oz + cremas a elección",
        category: "Snacks",
        price: 18.9
    },
    {
        code: "SN-20-115",
        name: "Snack Alitas Pachamanqueras",//
        pseudoName: "",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1684108759/images/lskbig4iygzshkpfaaiq.jpg", //-------------
        description: "Alitas de pollo + salsa pachamanquera + papas nativas + chicha morada, maracuyá o emoliente de 16 oz + cremas a elección",
        category: "Snacks",
        price: 20.9
    },
    {
        code: "SN-20-116",
        name: "Snack Alitas Mango Habanero",//
        pseudoName: "",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1684109380/images/xablhj5vjuqw6ud1csif.jpg", //--------------
        description: "Alitas de pollo + salsa de mango habanero + papas nativas + chicha morada, maracuyá o emoliente de 16 oz + cremas a elección",
        category: "Snacks",
        price: 22.9
    },
    {
        code: "SN-20-117",
        name: "Snack Chaufa BBQ",//
        pseudoName: "",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1684109379/images/txte0sk6ksttf9gywpuj.jpg", //-------------
        description: "Chaufa + tiras de pollo + salsa BBQ + papas nativas + chicha morada, maracuyá o emoliente de 16 oz + cremas a elección",
        category: "Snacks",
        price: 23.9
    },

    //Boxes
    {
        code: "BX-30-118",
        name: "Box Parrillero ",
        pseudoName: "",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1683663719/images/ny34dupav7ubak7mtvgc.jpg",
        description: "Carne de hamburguesa artesanal + pollo a la plancha + chorizo parrillero + salsa BBQ + papas nativas",
        category: "Boxes",
        price: 23.9
    },
    {
        code: "BX-30-119",
        name: "Box Parrillero a lo Pobre",
        pseudoName: "",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1683663772/images/axjsokguwuwoegnql4zb.jpg",
        description: "Carne de hamburguesa artesanal + pollo a la plancha + chorizo parrillero + plátano frito + huevo frito + papas nativas + salsa bbq",
        category: "Boxes",
        price: 25.9
    },
    {       //
        code: "BX-30-120",
        name: "Box Anticuchero",
        pseudoName: "",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1684109379/images/aewwbiqg7qbwohlnmdwk.jpg", //----------------
        description: "Jugosos anticuchos de corazón + mote + papas nativas + cremas a elección",
        category: "Boxes",
        price: 22.9
    },
    {       //
        code: "BX-30-121",
        name: "Box Anticuchero Mixto",
        pseudoName: "",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1684108759/images/lskbig4iygzshkpfaaiq.jpg", //------------------
        description: "Jugosos anticuchos de corazón + anticuchos de pollo + mote + papas nativas + cremas a elección.",
        category: "Boxes",
        price: 24.9
    },

    //Combos
    {
        code: "CB-40-122",
        name: "Combo Dúo",
        pseudoName: "",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1683663806/images/rbyr45bct6bhtx40r7qz.jpg",
        description: "6 alitas de pollo (2 tipos de sabores) + papas nativas + 2 refrescos de chicha morada, maracuyá o emoliente de 16 oz + cremas a elección",
        category: "Combos",
        price: 25.9
    },
    {
        code: "CB-40-123",
        name: "Combo Familiar",
        pseudoName: "",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1683663874/images/sw4rmkxafipoqualm5nz.jpg",
        description: "15 alitas de pollo (3 tipos de sabores) + papas nativas + 4 refrescos de chicha o maracuyá de 16 oz + cremas a elección",
        category: "Combos",
        price: 59.9
    },
    {
        code: "CB-40-124",
        name: "Combo Individual",
        pseudoName: "",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1683663904/images/vd9totv52il2pb3gl8pa.jpg",
        description: "3 alitas de pollo (1 tipo de sabor) + papas nativas + 1 refresco de chicha morada, maracuyá o emoliente de 16 oz + cremas a elección",
        category: "Combos",
        price: 13.9
    },
    {
        code: "CB-40-125",
        name: "Combo Super Wanka",
        pseudoName: "",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1683663938/images/tmob3x0h6gqybwlyawlh.jpg",
        description: "24 alitas de pollo (4 tipos de sabores) + papas nativas + 4 refrescos de chicha o maracuyá de 16 oz + cremas a elección",
        category: "Combos",
        price: 82.9
    },

    //Hamburguesas
    {
        code: "BG-50-126",
        name: "Burger A lo Pobre",
        pseudoName: "Hamburguesa A lo Pobre",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1683664030/images/pwduh0mthpy1cms72x2h.jpg",
        description: "Hamburguesa de carne artesanal + plátano + huevo + papas nativas + tomate + lechuga",
        category: "Hamburguesas",
        price: 16.9
    },
    {
        code: "BG-50-127",
        name: "Burger La Bacon Cheese",
        pseudoName: "Hamburguesa La Bacon Cheese",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1683664088/images/omuaxsswedyjwtgebjov.jpg",
        description: "Hamburguesa de carne artesanal + queso + tocino + papas nativas + tomate + lechuga",
        category: "Hamburguesas",
        price: 16.9
    },
    {
        code: "BG-50-128",
        name: "Burger La Cheese",
        pseudoName: "Hamburguesa La Cheese",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1683664161/images/fh6jxyoqmyijrlkqpllu.jpg",
        description: "Hamburguesa de carne artesanal + queso + papas nativas + tomate + lechuga",
        category: "Hamburguesas",
        price: 14.9
    },
    {
        code: "BG-50-129",
        name: "Burger La Clásica",
        pseudoName: "Hamburguesa La Clásica",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1683664191/images/zsyqeqqwrcx4xxxuutls.jpg",
        description: "Hamburguesa de carne artesanal + papas nativas + tomate + lechuga",
        category: "Hamburguesas",
        price: 13.9
    },
    {
        code: "BG-50-130",
        name: "Burger La Hawaiana",
        pseudoName: "Hamburguesa La Hawaiana",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1683664290/images/mvbdajnkzmssovv8jqsw.jpg",
        description: "Hamburguesa de carne artesanal + piña + queso + papas nativas + tomate + lechuga",
        category: "Hamburguesas",
        price: 16.9
    },
    {
        code: "BG-50-131",
        name: "Burger La Parrillera",
        pseudoName: "Hamburguesa La Parrillera",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1683664364/images/yjcqsqjeyvp33eulwlzr.jpg",
        description: "Hamburguesa de carne artesanal + chorizo + ají de casa+ papas nativas + tomate + lechuga",
        category: "Hamburguesas",
        price: 15.9
    },
    {
        code: "BG-50-132",
        name: "Burger La Royal",
        pseudoName: "Hamburguesa La Royal",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1683664410/images/x5k8arstufnhrmzefted.jpg",
        description: "Hamburguesa de carne artesanal + huevo + queso + papas nativas + tomate + lechuga",
        category: "Hamburguesas",
        price: 16.9
    },
    {       //
        code: "BG-50-133",
        name: "Burger Super Wanka",
        pseudoName: "Hamburguesa Super Wanka",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1684109380/images/xablhj5vjuqw6ud1csif.jpg", //--------------
        description: "Doble capa de Hamburguesa de carne artesanal + cebolla caramilizada + salsa secreta de la casa + tomate + lechuga.",
        category: "Hamburguesas",
        price: 23.9
    },
    {       //
        code: "BG-50-134",
        name: "Burger Wanka BBQ",
        pseudoName: "Hamburguesa Wanka BBQ",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1684109379/images/txte0sk6ksttf9gywpuj.jpg", //-----------
        description: "Hamburguesa de carne artesanal + tiras de pollo + salsas BBQ + papas nativas + tomate + lechuga",
        category: "Hamburguesas",
        price: 19.9
    },

    //Bebidas
    {
        code: "BC-60-101",
        name: "Infusión de Aniz",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1684285749/images/nuiem3flfobd2vj20woo.png",
        description: "Pendiente por definir",
        category: "Bebidas",
        price: 2.5
    },
    {
        code: "BC-60-102",
        name: "Infusión de Manzanilla",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1684285749/images/iaggagkew02ugmsgvxxx.jpg",
        description: "Pendiente por definir",
        category: "Bebidas",
        price: 2.5
    },
    {
        code: "BC-60-103",
        name: "Infusión de Hierba Luisa",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1684285749/images/xcqbhah5248lhssxykwl.png",
        description: "Pendiente por definir",
        category: "Bebidas",
        price: 2.5
    },
    {
        code: "BC-60-104",
        name: "Emoliente",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1684285749/images/xyknbrmi5g86vxgkfkac.png",
        description: "Pendiente por definir",
        category: "Bebidas",
        price: 3
    },
    {
        code: "BC-60-105",
        name: "Café pasado",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1684285749/images/nmdehaevrrwymgfohndk.png",
        description: "Pendiente por definir",
        category: "Bebidas",
        price: 3
    },
    {
        code: "BF-60-106",
        name: "Agua",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1684286230/images/iubnpukjmdeyyc3927im.png",
        description: "Pendiente por definir",
        category: "Bebidas",
        price: 2.5
    },
    {
        code: "BF-60-107",
        name: "Chicha morada",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1684286230/images/w6ngiytxo9h5oluqdkea.png",
        description: "16 oz",
        category: "Bebidas",
        price: 3
    },
    {
        code: "BF-60-108",
        name: "Maracuya ",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1684286230/images/efmi3svmrrk0a1wtgz75.png",
        description: "16 oz",
        category: "Bebidas",
        price: 3
    },
    {
        code: "BF-60-109",
        name: "Guarana ",
        image: "",
        description: "450ml",
        category: "Bebidas",
        price: 3
    },
    {
        code: "BF-60-110",
        name: "Sprite",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1684286230/images/nh6yc4ttsgq3wz6ecs5f.png",
        description: "500ml",
        category: "Bebidas",
        price: 4
    },
    {
        code: "BF-60-111",
        name: "Fanta",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1684286230/images/dbdjhxbxb7iey32ygrtf.png",
        description: "500ml",
        category: "Bebidas",
        price: 4
    },
    {
        code: "BF-60-112",
        name: "Inca Kola",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1684286230/images/spxmhmzgxjgtrnjqohjx.png",
        description: "600ml",
        category: "Bebidas",
        price: 5
    },
    {
        code: "BF-60-113",
        name: "Coca Cola",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1684286230/images/ivu367h0322zl1g6owxk.png",
        description: "600ml",
        category: "Bebidas",
        price: 5
    },
    {
        code: "BF-60-114",
        name: "Inca Kola",
        image: "",
        description: "1L",
        category: "Bebidas",
        price: 9
    },
    {
        code: "BF-60-115",
        name: "Coca Cola",
        image: "",
        description: "1L",
        category: "Bebidas",
        price: 9
    },
    {
        code: "BF-60-116",
        name: "Inca Kola",
        image: "",
        description: "1.5L",
        category: "Bebidas",
        price: 12
    },
    {
        code: "BF-60-117",
        name: "Coca Cola",
        image: "",
        description: "1.5L",
        category: "Bebidas",
        price: 12
    },
    {
        code: "BF-60-118",
        name: "Inca Kola",
        image: "",
        description: "3L",
        category: "Bebidas",
        price: 17
    },
    {
        code: "BF-60-119",
        name: "Coca Cola",
        image: "",
        description: "3L",
        category: "Bebidas",
        price: 17
    },

    //Extras
    {
        code: "EX-70-101",
        name: "Chorizo",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1684284894/images/qmk4whac9wwtu0znmvgj.png",
        description: "Pendiente por definir",
        category: "Extras",
        price: 4
    },
    {
        code: "EX-70-102",
        name: "Huevo Frito",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1684284894/images/ruswqmznvmwv4wnvcy2e.png",
        description: "Pendiente por definir",
        category: "Extras",
        price: 2
    },
    {
        code: "EX-70-103",
        name: "Plátano Crispy",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1684284894/images/vytudylk7sox5nq8sft5.png",
        description: "Pendiente por definir",
        category: "Extras",
        price: 4
    },
    {
        code: "EX-70-104",
        name: "Plátano Frito",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1684284894/images/jgn9upxhsitfb6cf3jkn.png",
        description: "Pendiente por definir",
        category: "Extras",
        price: 3
    },
    {
        code: "EX-70-105",
        name: "Salchicha",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1684284894/images/pkiw5elcikfptucmm0oj.png",
        description: "Pendiente por definir",
        category: "Extras",
        price: 3
    },
    {
        code: "EX-70-106",
        name: "Salsa BBQ Artesanal",
        image: "https://res.cloudinary.com/dmkklptzi/image/upload/v1684284894/images/hvlcxujlm5fk3qmb47se.png",
        description: "Pendiente por definir",
        category: "Extras",
        price: 3
    }
]

module.exports = products;