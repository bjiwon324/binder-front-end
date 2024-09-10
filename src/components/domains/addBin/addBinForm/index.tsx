import React, { DetailedHTMLProps, InputHTMLAttributes, useState } from "react";
import styles from "./AddBinForm.module.scss";
import classNames from "classnames/bind";
import Button from "@/components/commons/Button";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ImgInput from "./ImgInput";
import Input from "./Input";
import { btnInputValues } from "@/lib/constants/btnInputValues";
import { useMutation } from "@tanstack/react-query";
import postAddbin from "@/lib/apis/postAddbin";
import { useAtom } from "jotai";
import { userCoordinate } from "@/lib/atoms/userAtom";

const cn = classNames.bind(styles);

export interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
  isError?: boolean;
  errorMessage?: string;
  required?: boolean;
  id: string;
}

interface AddbinFormValues {
  address: string;
  title: string;
  binType: string;
  image?: FileList | string;
}

export interface PostAddbinValues extends AddbinFormValues {
  latitude?: number;
  longitude?: number;
}

export default function AddBinForm() {
  const [selectedBin, setSelectedBin] = useState<string>("");
  const [img, setImg] = useState<string>("");
  const [coordinate, setCoordinate] = useAtom(userCoordinate);
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    control,
    formState: { errors },
  } = useForm<AddbinFormValues>({ mode: "onBlur" });

  console.log("formerror", errors);

  const handleChangeImgData = (imgUrl: string) => {
    setImg(imgUrl);
  };

  const handleBinTypeClick = (id: string) => {
    setSelectedBin(id);
    setValue("binType", id);
    trigger("binType");
  };

  const onSubmit: SubmitHandler<AddbinFormValues> = (data) => {
    const postData: PostAddbinValues = data;
    postData.image = img;
    console.log(postData);
    postData.latitude = coordinate.x;
    postData.longitude = coordinate.y;
    submitAddbin(postData);
  };

  const { mutate: submitAddbin } = useMutation({
    mutationKey: ["post-add-bin"],
    mutationFn: (data: PostAddbinValues) => postAddbin(data),
    onSuccess: (res) => {
      console.log(res);
      //모달띄우기ㅣ
    },
  });

  return (
    <form className={cn("addbin-form")} onSubmit={handleSubmit(onSubmit)}>
      <Input
        id="address"
        label="쓰레기통 주소"
        placeholder="주소를 입력하세요"
        {...register("address", { required: "주소는 필수입니다." })}
        isError={!!errors.address}
        errorMessage={errors.address?.message}
      />

      <div className={cn("addbin-selector")}>
        <p className={cn("addbin-label", { error: !!errors.binType })}>쓰레기통 분류</p>
        <Controller
          name="binType"
          control={control}
          rules={{ required: "필수 항목입니다." }}
          render={({ field, fieldState: { error } }) => (
            <>
              {btnInputValues.map((bin) => (
                <Button
                  key={bin.id}
                  id={bin.id}
                  type="button"
                  selected={selectedBin === bin.id}
                  onClick={() => {
                    handleBinTypeClick(bin.id);
                  }}
                  {...field}
                >
                  {bin.label}
                </Button>
              ))}
              {error && <p className="error-message">{error.message}</p>} {/* 오류 메시지 출력 */}
            </>
          )}
        />
      </div>

      <Input
        id="title"
        label="장소 명칭"
        placeholder="명칭을 입력하세요"
        {...register("title", { required: "명칭은 필수입니다." })}
        isError={!!errors.title}
        errorMessage={errors.title?.message}
      />

      <ImgInput id="img" {...register("image")} img={img} onChangeImgData={handleChangeImgData} />

      <Button status="primary" type="submit" disabled={!errors}>
        위치 등록하기
      </Button>
    </form>
  );
}
