import { useRef, useState, useEffect } from "react";
import { createStyles, Group, Button, Select, TextInput, Tooltip } from "@mantine/core";
import { Editor } from "@mantine/rte";
import { Eye, Link, Send, Calendar } from "tabler-icons-react";
import { PremierDropzone } from "../PremierDropzone";
import dayjs from 'dayjs';
import { CalenderModal } from "../../reusable/modal/CalenderModal";

const useStyles = createStyles((theme) => ({
  dropdown: {
    width: 150,
  },
  calenderButton: {
    fontWeight: 400,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[0],
  },
  activeCalender: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[8],
  },
  inactiveCalender: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[8],
  }
}));

interface Props {
  toogle: () => void;
  setLoading: (params: boolean) => void;
}

// TODO Fix this tab
export function PremierPostTab({ toogle, setLoading }: Props) {
  const { classes, cx } = useStyles();
  const [visibility, setVisibility] = useState<any | null>(null);
  const editorRef = useRef<Editor>(null);
  const [datetime, setDatetime] = useState<Date | null>(null);
  const [showCalender, setShowCalender] = useState(false)

  useEffect(() => {
    editorRef?.current?.focus();
  }, []);

  return (
    <>
      <PremierDropzone />
      <TextInput variant="default" placeholder="Drop premiere link" icon={<Link size={16} />} size="xs" mb="sm" />
      <Group>
        <Select
          placeholder="Visibility"
          data={[
            { value: "1", label: "Public" },
            { value: "2", label: "Closed" },
            { value: "3", label: "Private" },
          ]}
          icon={<Eye size={16} />}
          searchable
          nothingFound="No options"
          value={visibility}
          onChange={(e) => setVisibility(e)}
          size="xs"
          className={classes.dropdown}
        />
        <Tooltip label="Set Premier Time" position="top">
          <Button className={cx(classes.calenderButton, { [classes.activeCalender]: datetime, [classes.inactiveCalender]: !datetime })} leftIcon={<Calendar size={16} />} variant="light" color="gray" size="xs" onClick={() => setShowCalender(true)}>
            {datetime ? dayjs(datetime).format('MMM DD, YYYY  hh:mm A') : "Select Premier Time"}
          </Button>
        </Tooltip>
        <Button size="xs" ml="auto" color="gray" onClick={() => toogle()}>
          Close
        </Button>
        <Button size="xs" leftIcon={<Send size={16} />}>
          Submit
        </Button>
      </Group>
      <CalenderModal opened={showCalender} setOpened={setShowCalender} datetime={datetime} setDatetime={setDatetime} />

    </>
  );
}
