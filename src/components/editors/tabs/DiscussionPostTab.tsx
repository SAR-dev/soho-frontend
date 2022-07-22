import { useState, useEffect } from "react";
import { createStyles, Group, Button, Select, Switch, Center } from "@mantine/core";
import { ImageDropzone } from "../ImageDropzone";
import { Check, Eye, Hash, Send } from "tabler-icons-react";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { createAuthorPost, createSubscriberPost, getChannels, parseErrors } from "../../../helpers";
import { useNotifications } from "@mantine/notifications";
import { ErrorMessage } from "@reusable/ErrorMessage";
import { Ctiptap } from "src/components/ctiptap";
import { LimitCounter } from "src/components/ctiptap/LimitCounter";

const useStyles = createStyles((theme) => ({
  dropdown: {
    width: 150,
  },
  footerButton: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[2],
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[5],
  },
  errorHolder: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colorScheme === "dark"
      ? theme.colors.dark[5]
      : theme.colors.gray[2],
    padding: theme.spacing.xs,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colorScheme === 'dark'
      ? theme.fn.rgba(theme.colors.yellow[1], 0.25)
      : theme.colors[theme.primaryColor][0],
  },
  mlAuto: {
    marginLeft: "auto"
  },
  right: {
    justifyContent: 'right'
  },
  left: {
    justifyContent: 'left'
  },
  mysm: {
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  mbsm: {
    marginBottom: theme.spacing.sm,
  },
  flex: {
    display: 'flex'
  },
}));

interface Props {
  toogle: () => void;
  setLoading: (params: boolean) => void;
  is_admin: boolean;
}

interface DataParam {
  data: {
    count: number;
    next: null;
    previous: null;
    results: Result[];
  }
}

interface Result {
  id: number;
  color: string;
  name: string;
  slug: string;
  about: null;
  sub_categories: SubCategory[];
}

interface SubCategory {
  id: number;
  name: string;
  slug: string;
}

interface SelectModel {
  id: number;
  label: string;
  value: string;
  slug: string;
}

const textLimit = 5000

export function DiscussionPostTab({ toogle, setLoading, is_admin }: Props) {
  const { classes, cx } = useStyles();
  const { author } = useParams<"author">();
  const { sName } = useParams<"sName">();
  const { cName } = useParams<"cName">();
  const { pType } = useParams<"pType">();
  const notifications = useNotifications();
  const queryClient = useQueryClient()

  const [text, setText] = useState("");
  const [category, setCategory] = useState<any | null>(null);
  const [sub_category, set_sub_category] = useState<any | null>(null);
  const [checked, setChecked] = useState(false);
  const [images, setImages] = useState<Array<number>>([])
  const [errors, setErrors] = useState<string[]>([])
  const [queryKey, setQueryKey] = useState<string[]>([])

  const [subChannels, setSubChannels] = useState<SelectModel[]>([])
  const { status, data, error, isFetching, isLoading } = useQuery<DataParam, Error>(['channels', author], () => getChannels({ username: author }), {
    onSuccess: res => {
      setSubChannels(res.data.results.map(e => e.sub_categories.map(el => { 
        return { id: el.id, label: el.name, value: String(el.id), slug: el.slug } 
      })).flat())
    }
  })

  useEffect(() => {
    if (author && sName) setQueryKey(["sub_cat_posts", author, sName])
    if (author && cName) setQueryKey(["cat_posts", author, cName])
    if ((author && pType)) setQueryKey(["type_posts", author, pType])
    if ((author && !sName && !cName && !pType)) setQueryKey(["type_posts", author, "all"])
  }, []);

  useEffect(() => {
    if (sName) {
      const scat = subChannels.find(e => e.slug === sName)
      if (scat) set_sub_category(scat.id.toString())
    }
  }, [subChannels])


  const addImage = (id: number) => {
    setImages(images => [...images, id])
  }

  const submit = () => {
    if (!sub_category) {
      setErrors(["A channel must be selected here."])
      return
    }
    setLoading(true)
    setErrors([])
    const data = {
      content: text?.replace(/<p><br[\/]?><[\/]?p>/g, ''),
      images: images,
      category: category,
      sub_category: sub_category,
      post_type: checked ? 'announcement' : 'discussion'
    }
    if (is_admin) {
      createAuthorPost({ username: author, data: data }).then(res => {
        if (res.error) {
          setErrors(parseErrors(res.error))
          setLoading(false)
        } else {
          notifications.showNotification({
            title: "Post Submitted",
            message: "Your post has been submitted. Please wait for a while for your post to appear in your feed.",
            color: "teal",
            icon: <Check size={18} />,
            autoClose: 5000,
          });
          queryClient.invalidateQueries([...queryKey])
          toogle()
        }
      })
    } else {
      createSubscriberPost({ username: author, data: data }).then(res => {
        if (res.error) {
          setErrors(parseErrors(res.error))
          setLoading(false)
        } else {
          notifications.showNotification({
            title: "Post Submitted",
            message: "Your post has been submitted. Please wait for a while for your post to appear in your feed.",
            color: "teal",
            icon: <Check size={18} />,
            autoClose: 5000,
          });
          queryClient.invalidateQueries([...queryKey])
          toogle()
        }
      })
    }

  }

  return (
    <>
      <Ctiptap text={text} setText={setText} limit={textLimit} />
      <div className={cx(classes.mysm, { [classes.flex]: images.length === 0 })}>
        {images.length !== 0 && (
          <div className={cx(classes.left, classes.flex, classes.mbsm)}>
            <LimitCounter count={text.length} limit={textLimit} />
          </div>
        )}
        <ImageDropzone disabled={false} images={images} addImage={addImage} />
        {images.length === 0 && (
          <div className={cx(classes.mlAuto, classes.right)}>
            <LimitCounter count={text.length} limit={textLimit} />
          </div>
        )}
      </div>
      <Group>
        <Select
          placeholder="Channel"
          data={subChannels}
          icon={<Eye size={16} />}
          nothingFound="No options"
          value={sub_category}
          onChange={(e) => set_sub_category(e)}
          size="xs"
          className={classes.dropdown}
          disabled={isLoading}
        />
        <Switch
          label="Announcement"
          checked={checked}
          size="xs"
          onChange={(event) => setChecked(event.currentTarget.checked)}
        />
        <Button size="xs" ml="auto" color="gray" onClick={() => toogle()}>
          Close
        </Button>
        <Button size="xs" leftIcon={<Send size={16} />} onClick={() => submit()}>
          Publish
        </Button>
      </Group>
      <ErrorMessage errors={errors} />
    </>
  );
}
