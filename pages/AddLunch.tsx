import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { options, OptionType } from "components/common/types";
import Select from "react-select";
import WaterSvg from "components/common/WaterSvg";
import Layout from "components/common/Layout";

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
      alert(
        "추가해주셔서 감사합니다!\n추가해 주신 식당은 데이터 확인 후 리스트에 노출 됩니다."
      );
      reset();
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

        {/* {errors?.type && (
          <p className="mt-2 text-sm ml-2 text-gray-500 w-full">
            {errors?.type?.message}
          </p>
        )} */}
      </div>
      <div className="grid gap-x-4 grid-cols-3">
        <label className="ml-2 row-span-2 text-base">
          상호 <em className="text-red-500"> *</em>{" "}
        </label>
        <input
          className="form-input px-4 py-2 text-black col-span-2 w-full"
          {...register("name", registerOptions.name)}
          placeholder="식당 이름"
          type="text"
          // error={Boolean(errors?.name?.message)}
        />
        {/* {errors?.name && (
          <p className="mt-2 text-sm ml-2 text-gray-500 w-full">
            {errors?.name?.message}
          </p>
        )} */}
      </div>
      <div className="grid gap-x-4 grid-cols-3">
        <label className="ml-2 row-span-2 text-base">
          설명 <em className="text-red-500"> *</em>{" "}
        </label>
        <input
          className="form-textarea px-4 py-2 text-black col-span-2 w-full"
          {...register("description", registerOptions.description)}
          type="textarea"
          placeholder="ex: 인생맛집입니다. / 주로 커피를 팝니다."
        />
        {/* {errors?.description && (
          <p className="mt-2 text-sm ml-2 text-gray-500 w-full">
            {errors?.description?.message}
          </p>
        )} */}
      </div>
      <div className="grid gap-x-4 grid-cols-3">
        <label className="ml-2 row-span-2 text-base">
          종류 <em className="text-red-500"> *</em>{" "}
        </label>
        <input
          className="form-input px-4 py-2 text-black col-span-2 w-full"
          {...register("sort", registerOptions.sort)}
          type="text"
          placeholder="ex: 점심, 카페, 디저트..."
        />
        {/* {errors?.sort && (
          <p className="mt-2 text-sm ml-2 text-gray-500 w-full">
            {errors?.sort?.message}
          </p>
        )} */}
      </div>
      <div className="grid gap-x-4 grid-cols-3">
        <label className="ml-2 row-span-2 text-base">
          메뉴 <em className="text-red-500"> *</em>{" "}
        </label>
        <input
          className="form-input px-4 py-2 text-black col-span-2 w-full"
          {...register("menu", registerOptions.menu)}
          type="text"
          placeholder="ex: 짜장면, 탕수육, 잡채밥.."
        />
        {/* {errors?.menu && (
          <p className="mt-2 text-sm ml-2 text-gray-500 w-full">
            {errors?.menu?.message}
          </p>
        )} */}
      </div>
      <div className="grid gap-x-4 grid-cols-3">
        <label className="ml-2 row-span-2 text-base">평균 가격대</label>
        <input
          className="form-input px-4 py-2 text-black col-span-2 w-full"
          type="text"
          placeholder="ex: ~10000원"
        />
      </div>
      <div className="grid gap-x-4 grid-cols-3">
        <label className="ml-2 row-span-2 text-base">링크</label>
        <input
          className="form-input px-4 py-2 text-black col-span-2 w-full"
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
          disabled={!isValid}
          type="submit"
        >
          {isValid && <WaterSvg width={20} color={"#fff"} />}
          더하기
        </button>
      </div>
    </form>
  );
};

AddLunch.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;
export default AddLunch;
