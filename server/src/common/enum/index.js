export const CategoryLevel1 = Object.freeze({
    DO_AN: { id: 1, label: "Đồ ăn" },
    DO_UONG: { id: 2, label: "Đồ uống" },
    TRANG_MIENG: { id: 3, label: "Tráng miệng" },
});

export const CategoryLevel2 = Object.freeze({
    COM: { id: 1, label: "Cơm", parentId: CategoryLevel1.DO_AN.id },
    MI: { id: 2, label: "Mì", parentId: CategoryLevel1.DO_AN.id },
    LAU: { id: 3, label: "Lẩu", parentId: CategoryLevel1.DO_AN.id },
    BUN: { id: 4, label: "Bún", parentId: CategoryLevel1.DO_AN.id },

    NUOC_NGOT: { id: 5, label: "Nước ngọt", parentId: CategoryLevel1.DO_UONG.id },
    BIA: { id: 6, label: "Bia", parentId: CategoryLevel1.DO_UONG.id },
    RUOU: { id: 7, label: "Rượu", parentId: CategoryLevel1.DO_UONG.id },

    BANH_NGOT: { id: 8, label: "Bánh ngọt", parentId: CategoryLevel1.TRANG_MIENG.id },
    KEM: { id: 9, label: "Kem", parentId: CategoryLevel1.TRANG_MIENG.id },
    TRAI_CAY: { id: 10, label: "Trái cây", parentId: CategoryLevel1.TRANG_MIENG.id },
});

export const thongTin = Object.freeze({
    DANG_THI_HUYEN: {
        hoTen: "Đặng Thị Huyền",
        ngaySinh: "2000-05-20",
        maSinhVien: "K23DTCN362",
        tenLop: "D23TXCN05-K",
        soDienThoai: "0912345678",
        email: "dangthihuyen@gmail.com",
        donViCongTac: "Công ty ABC",
        websiteDonVi: "https://www.congtyabc.com",
        hinhAnh: "istockphoto-1337144146-612x612.jpg"
    },

    HOANG_THI_DUYEN: {
        hoTen: "Hoàng Thị Duyên",
        ngaySinh: "2001-08-12",
        maSinhVien: "K23DTCN339",
        tenLop: "D23TXCN05-K",
        soDienThoai: "0987654321",
        email: "hoangthiduyen@gmail.com",
        donViCongTac: "Công ty XYZ",
        websiteDonVi: "https://www.xyz.com",
        hinhAnh: "istockphoto-1337144146-612x612.jpg"
    },

    PHAM_QUANG_HANH: {
        hoTen: "Phạm Quang Hạnh",
        ngaySinh: "1999-11-03",
        maSinhVien: "K23DTCN350",
        tenLop: "D23TXCN05-K",
        soDienThoai: "0901234567",
        email: "phamquanghanh@gmail.com",
        donViCongTac: "Công ty DEF",
        websiteDonVi: "https://www.def.com",
        hinhAnh: "istockphoto-1337144146-612x612.jpg"
    },

    NGO_MINH_QUAN: {
        hoTen: "Ngô Minh Quân",
        ngaySinh: "2002-02-14",
        maSinhVien: "K23DTCN392",
        tenLop: "D23TXCN05-K",
        soDienThoai: "0932123456",
        email: "ngominhquan.com",
        donViCongTac: "Công ty GHI",
        websiteDonVi: "https://www.ghi.com",
        hinhAnh: "istockphoto-1337144146-612x612.jpg"
    },

    DUONG_THANH_DO: {
        hoTen: "Dương Thành Đô",
        ngaySinh: "2000-09-25",
        maSinhVien: "K23DTCN444",
        tenLop: "D23TXCN05-K",
        soDienThoai: "0976543210",
        email: "duongthanhdo.com",
        donViCongTac: "Công ty JKL",
        websiteDonVi: "https://www.jkl.com",
        hinhAnh: "istockphoto-1337144146-612x612.jpg"
    }
});

