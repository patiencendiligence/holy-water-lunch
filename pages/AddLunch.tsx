import { useState } from "react";
import { useForm } from "react-hook-form";
import { options } from "@/components/common/types";
import Select from "react-select";
import WaterSvg from "@/components/common/WaterSvg";
import Layout from "@/components/common/Layout";
import Toast from "@/components/common/Toast";
import { DefaultTarget, RegisterOptions } from "@/constants";

const AddLunch = () => {
  const [targetLunch, setTargetLunch] = useState<typeof DefaultTarget>(DefaultTarget);
  const [selectedOption, setSelectedOption] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    control,
    trigger,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: DefaultTarget,
  });
  const onSubmit = async () => {
    setLoading(true);
    const valid = await trigger();
    if (valid) {
      const sendData = { ...getValues() };
      sendData["type"] = targetLunch.type;
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
      setTargetLunch(DefaultTarget)
    }
  };

  const handleChange = (option: any) => {
    setTargetLunch((prev) => { return { ...prev, type: option.value } });
    setSelectedOption(option);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full px-2 grid grid-flow-row auto-rows-max gap-4 text-slate-200"
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
            {...register("name", RegisterOptions.name)}
            placeholder="식당 이름"
            type="text"
          />
        </div>
        <div className="grid gap-x-4 grid-cols-3">
          <label className="ml-2 row-span-2 text-base">
            설명 <em className="text-red-500"> *</em>{" "}
          </label>
          <input
            className="form-textarea px-4 py-2 text-black col-span-2 w-full  rounded-md"
            {...register("description", RegisterOptions.description)}
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
            {...register("sort", RegisterOptions.sort)}
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
            {...register("menu", RegisterOptions.menu)}
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
              <img src="/assets/loading.svg" width={100} height={101} />
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
