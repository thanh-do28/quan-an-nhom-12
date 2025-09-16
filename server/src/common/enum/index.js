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