
import { Lunch } from "@/components/common/types";
export const LunchType = [
    {
        name: "RANDOM",
        color: " #ee7c01",
        width: "43%",
        href: "/lunch/random",
        type: "normal",
        isBounce: true
    },
    {
        name: "JAPANESE",
        color: "#c766e7",
        width: "48%",
        href: "/lunch/japanese",
        type: "normal",
    },
    {
        name: "ASIAN",
        color: "#5390f2",
        width: "31%",
        href: "/lunch/asian",
        type: "svg",
    },
    {
        name: "🍔",
        color: "#f6c101",
        width: "20%",
        href: "/lunch/burger",
        type: "normal",
    },
    {
        name: "CHINESE",
        color: "#f6c101",
        width: "35%",
        href: "/lunch/chinese",
        type: "normal",
    },
    {
        name: "ALL",
        color: "#c165e5",
        width: "47%",
        href: "/lunch/LunchList",
        type: "normal",
        hasAnimation: true
    },
    {
        name: "+",
        color: " #568EFF",
        width: "42%",
        href: "/AddLunch",
        type: "normal",
    },
    {
        name: "🥪",
        color: "#c21",
        width: "18%",
        href: "/lunch/sandwich",
        type: "normal",
    },
    {
        name: "KOREAN",
        color: "#0253c2",
        width: "38%",
        href: "/lunch/korean",
        type: "normal",
    },
    {
        name: "ITALIAN",
        color: "#117237",
        width: "28%",
        href: "/lunch/italian",
        type: "normal",
    },
    {
        name: "☕️ & 🥐",
        color: "#a60",
        width: "42%",
        href: "/lunch/coffee",
        type: "normal",
    },
    { name: "?", color: "#047462", width: "18%", href: "/about", type: "normal" },
    {
        name: "💬",
        color: "#c766e7",
        width: "18%",
        href: "/chat",
        type: "normal",
    },
];

export const DefaultTarget: Lunch = {
    name: '',
    type: '',
    description: '',
    sort: '',
    menu: '',
    url: '',
    priceRate: '',
    imageUrl: '',
    isDisplayed: false
}
export const RegisterOptions = {
    name: { required: "식당 이름을 입력해주세요.." },
    type: { required: "카테고리를 선택해주세요.." },
    description: { required: "가게 설명을 입력해주세요.." },
    sort: { required: "종류를 입력해주세요.." },
    menu: { required: "메뉴를 입력해주세요.." },
};