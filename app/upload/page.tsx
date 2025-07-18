"use client";
import { Button } from "@vapor-ui/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUploadPicture, useUploadTour } from "../_hooks/useTourMutations";
import Address from "./_components/Address";
import { Category } from "./_components/Category";
import Description from "./_components/Description";
import Header from "./_components/Header";
import ImageUploader from "./_components/ImageUploader";
import OperatingHours from "./_components/OperatingHours";
import PlaceName from "./_components/PlaceName";

type CategoryType = Record<"value" | "label" | "id", string>;

export default function UploadPage() {
  const [placeName, setPlaceName] = useState("");
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");
  const [operatingHours, setOperatingHours] = useState<[string, string]>(["10:30", "22:00"]);
  const [category, setCategory] = useState<CategoryType[]>([]);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const [submit, setSubmit] = useState(false);

  const isDisabled = !placeName || !address || !postcode || !operatingHours || !category || !description || !image;

  const { mutate: createTour } = useUploadTour();
  const { mutateAsync: uploadPicture } = useUploadPicture();

  const router = useRouter();

  return (
    <div className="flex-1 relative">
      <Header />
      <div className="py-5 px-7 flex flex-col gap-6">
        <PlaceName placeName={placeName} setPlaceName={setPlaceName} />
        <Address address={address} setAddress={setAddress} postcode={postcode} setPostcode={setPostcode} />
        <OperatingHours operatingHours={operatingHours} setOperatingHours={setOperatingHours} />
        <Category category={category} setCategory={setCategory} />
        <Description description={description} setDescription={setDescription} />
        <ImageUploader image={image} setImage={setImage} file={file} setFile={setFile} />
      </div>
      <div className="sticky bottom-0 w-full px-7 py-7">
        <Button
          size="xl"
          style={{
            backgroundColor: "#FF6500",
            color: "var(--vapor-color-white)",
            width: "100%",
          }}
          onClick={async () => {
            setSubmit(true);
            if (!file) {
              setSubmit(false);
              return;
            }

            const imageResponse = await uploadPicture(file);

            createTour(
              {
                title: placeName,
                fullAddress: address,
                serviceHours: operatingHours,
                categoryList: category.map((c) => c.value) as (
                  | "FOOD"
                  | "NIGHT_MARKET"
                  | "NATURE"
                  | "FESTIVAL"
                  | "WALKING_PATH"
                  | "NIGHT_VIEW"
                  | "ROMANTIC"
                )[],
                description,
                imageId: imageResponse.data.id,
              },
              {
                onSuccess: () => {
                  router.push("/upload/done");
                },
                onError: () => {
                  setSubmit(false);
                },
              }
            );
          }}
          disabled={isDisabled || submit}
        >
          저장하기
        </Button>
      </div>
    </div>
  );
}
