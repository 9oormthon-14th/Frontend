import { TMood, useSelectStore } from "@/app/_store/useSelectStore";
import { Button, IconButton, RadioGroup, Text } from "@vapor-ui/core";
import { BackPageOutlineIcon } from "@vapor-ui/icons";
import CheckButton from "./CheckButton";

interface IStep3 {
  goBack: () => void;
  goNext: () => void;
}

export default function Step3({ goBack, goNext }: IStep3) {
  const { mood, setMood } = useSelectStore();

  const handleClick = (item: string) => {
    setMood(item as TMood);
  };

  const itemArray = ["차분", "로맨틱", "신남", "특별함", "힐링", "기쁨"];

  return (
    <div className="flex flex-col flex-1 items-center justify-between">
      <div>
        {/* 뒤로 가기 */}

        <IconButton
          onClick={() => goBack()}
          size="xl"
          color="primary"
          variant="ghost"
          shape="square"
          aria-label="뒤로가기?"
        >
          <BackPageOutlineIcon color="#525463" width={18} height={18} />
        </IconButton>
        {/* 상단 텍스트 */}
        <div className="mt-4 mb-14">
          <Text typography="heading3" style={{ color: "var(--vapor-color-white)" }}>
            어떤 분위기의 밤을 <br />
            즐기고 싶으신가요?
          </Text>
        </div>

        <RadioGroup.Root name="mood">
          <div className="grid grid-cols-2 gap-3">
            {itemArray.map((item) => (
              <RadioGroup.Item value={item} key={item}>
                <CheckButton text={item} onClick={handleClick} checked={item === mood} />
              </RadioGroup.Item>
            ))}
          </div>
        </RadioGroup.Root>
      </div>

      <Button className="bg-[#ff6500] mb-[113px] mt-[62px]" size="xl" stretch onClick={goNext} disabled={!mood}>
        다음
      </Button>
    </div>
  );
}
