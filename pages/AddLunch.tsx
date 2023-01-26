import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { options, OptionType } from "components/common/types";
import Select from "react-select";
import WaterSvg from "components/common/WaterSvg";
import Layout from "components/common/Layout";
import Toast from "components/common/Toast";

const AddLunch = () => {
  // const passDigital = new RegExp(/^([^0-9, S]*)$/);

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [sort, setSort] = useState("");
  const [menu, setMenu] = useState("");
  const [url, setUrl] = useState("");
  const [priceRate, setPriceRate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedOption, setSelectedOption] = useState();
  const [loading, setLoading] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const registerOptions = {
    name: { required: "식당 이름을 입력해주세요.." },
    type: { required: "카테고리를 선택해주세요.." },
    description: { required: "가게 설명을 입력해주세요.." },
    sort: { required: "종류를 입력해주세요.." },
    menu: { required: "메뉴를 입력해주세요.." },
  };
  const {
    register,
    handleSubmit,
    control,
    trigger,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      sort: "",
      name: "",
      menu: "",
      url: "",
      description: "",
      priceRate: "",
      type: "",
      imageUrl: "",
      isDisplayed: false,
    },
  });
  const onSubmit = async () => {
    setLoading(true);
    const valid = await trigger();
    if (valid) {
      const sendData = { ...getValues() };
      sendData["type"] = type;
      const rawResponse = await fetch("/api/submit", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      });
      const content = await rawResponse.json();
      console.log(content, ":content");
      setIsShow(true);
      reset();
      setLoading(false);
      // print to screen
      setName("");
      setType("");
      setDescription("");
      setSort("");
      setMenu("");
      setUrl("");
      setPriceRate("");
      setImageUrl("");
    }
  };

  const handleChange = (option: any) => {
    setType(option.value);
    setSelectedOption(option);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full px-2 grid grid-flow-row auto-rows-max gap-4"
      >
        <span className="text-base w-60">
          HOLY WATER LUNCH 리스트에
          <br />
          추가하고픈 맛집이 있다면-
        </span>
        <div>
          <Select
            placeholder="카테고리를 선택해주세요"
            instanceId="1"
            value={selectedOption}
            onChange={(option: any) => handleChange(option)}
            options={options}
            className="text-black py-2 text-base"
          />
        </div>
        <div className="grid gap-x-4 grid-cols-3">
          <label className="ml-2 row-span-2 text-base">
            상호 <em className="text-red-500"> *</em>{" "}
          </label>
          <input
            className="form-input px-4 py-2 text-black col-span-2 w-full  rounded-md"
            {...register("name", registerOptions.name)}
            placeholder="식당 이름"
            type="text"
            // error={Boolean(errors?.name?.message)}
          />
        </div>
        <div className="grid gap-x-4 grid-cols-3">
          <label className="ml-2 row-span-2 text-base">
            설명 <em className="text-red-500"> *</em>{" "}
          </label>
          <input
            className="form-textarea px-4 py-2 text-black col-span-2 w-full  rounded-md"
            {...register("description", registerOptions.description)}
            type="textarea"
            placeholder="ex: 인생맛집입니다. / 주로 커피를 팝니다."
          />
        </div>
        <div className="grid gap-x-4 grid-cols-3">
          <label className="ml-2 row-span-2 text-base">
            종류 <em className="text-red-500"> *</em>{" "}
          </label>
          <input
            className="form-input px-4 py-2 text-black col-span-2 w-full  rounded-md"
            {...register("sort", registerOptions.sort)}
            type="text"
            placeholder="ex: 점심, 카페, 디저트..."
          />
        </div>
        <div className="grid gap-x-4 grid-cols-3">
          <label className="ml-2 row-span-2 text-base">
            메뉴 <em className="text-red-500"> *</em>{" "}
          </label>
          <input
            className="form-input px-4 py-2 text-black col-span-2 w-full  rounded-md"
            {...register("menu", registerOptions.menu)}
            type="text"
            placeholder="ex: 짜장면, 탕수육, 잡채밥.."
          />
        </div>
        <div className="grid gap-x-4 grid-cols-3">
          <label className="ml-2 row-span-2 text-base">평균 가격대</label>
          <input
            className="form-input px-4 py-2 text-black col-span-2 w-full  rounded-md"
            type="text"
            placeholder="ex: ~10000원"
          />
        </div>
        <div className="grid gap-x-4 grid-cols-3">
          <label className="ml-2 row-span-2 text-base">링크</label>
          <input
            className="form-input px-4 py-2 text-black col-span-2 w-full  rounded-md"
            type="text"
            placeholder="ex: 블로그 주소, 인스타 주소 등"
          />
        </div>
        {/* <input
          {...register("imageUrl", { required: true })}
          type="text"
          placeholder="종류(ex: 점심, 카페, 디저트...)"
        />
        {errors?.imageUrl?.type === "required" && (
          <span>음식 사진이 있으시</span>
        )} */}
        <div className="py-4 text-center">
          <button
            style={{
              background: !isValid ? "#ddd" : "#14b4fc",
              color: !isValid ? "grey" : "#fff",
            }}
            className="align-center mx-auto w-full py-4 text-base rounded-md"
            disabled={!isValid && !loading}
            type="submit"
          >
            {!!loading && (
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 mr-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            )}
            {(!!isValid || !loading) && (
              <>
                <WaterSvg width={20} color={"#fff"} /> 더하기
              </>
            )}
          </button>
        </div>
      </form>
      {!!isShow && (
        <div
          className="absolute top-0 left-0"
          style={{
            display: isShow ? "block" : "hidden",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            background: "rgba(0,0,0,0.8)",
          }}
        >
          <Toast
            type="success"
            message={`감사합니다! 🙌`}
            subMessage={`데이터 확인 후 리스트에 반영됩니다.`}
            isShow={isShow}
            onClick={(event) => setIsShow(false)}
          />
        </div>
      )}
    </>
  );
};

AddLunch.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;
export default AddLunch;
