import { IProduct } from "@/interfaces/product.interface";
import { ICartProduct } from "@/interfaces/purchase.interface";
import { toast } from "sonner";



export const CartService = {
    addToCart(product: IProduct) {
        const productToAdd: ICartProduct = { product: product, count: 1 };
        const cart = localStorage.getItem("cart");

        if (cart != null) {
            let parsedCart: ICartProduct[] = JSON.parse(cart);

            let alreadyExist: boolean = false;
            parsedCart.forEach((element) => {
                if (element.product.id == productToAdd.product.id) {
                    alreadyExist = true;
                }
                return;
            });

            if (alreadyExist) {
                toast("Вы уже добавили товар");
            } else {
                parsedCart.push(productToAdd);
                toast("Вы добавили товар в корзину")
                localStorage.setItem("cart", JSON.stringify(parsedCart));
            }
        } else {
            localStorage.setItem("cart", JSON.stringify([]));
            this.addToCart(product);
        }
    },

    removePiece(product: ICartProduct) {
        const productToRemove = product;
        const cart = localStorage.getItem("cart");

        if (cart != null) {
            let parsedCart: ICartProduct[] = JSON.parse(cart);

            let productIndex: number | undefined = undefined;
            parsedCart.forEach((element, index) => {
                if (element.product.id == productToRemove.product.id) {
                    productIndex = index;
                }
                return;
            });

            if (productIndex != undefined) {
                parsedCart.splice(productIndex, 1);
                localStorage.setItem("cart", JSON.stringify(parsedCart));
            }
        }
    },

    existInCart(product: IProduct) {
        const productToAdd = product;
        const cart = localStorage.getItem("cart");

        if (cart != null) {
            let parsedCart: ICartProduct[] = JSON.parse(cart);

            let alreadyExist: boolean = false;
            parsedCart.forEach((element) => {
                if (element.product.id == productToAdd.id) {
                    alreadyExist = true;
                }
                return;
            });

            if (alreadyExist) {
                return true;
            } else {
                return false;
            }
        }
    },

    getCart(): ICartProduct[] {
        if (!localStorage.getItem("cart")) {
            localStorage.setItem("cart", JSON.stringify([]));
        }
        return JSON.parse(localStorage.getItem("cart") as string);
    },

    setCount(crement: setCount, product: IProduct) {
        const cart = localStorage.getItem("cart") as string;

        if (cart != null) {
            let parsedCart: ICartProduct[] = JSON.parse(cart);

            parsedCart.forEach((cartItem) => {
                if (cartItem.product.id == product.id) {
                    if (crement == "+") {
                        cartItem.count++;
                    }
                    if (crement == "-") {
                        cartItem.count--;
                    }
                }
            });

            localStorage.setItem("cart", JSON.stringify(parsedCart));
        }
    },
};
export type setCount = "-" | "+";
