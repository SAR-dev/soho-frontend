import { CommunityLayout } from '@layouts/CommunityLayout';
import { Button, createStyles, Modal, Notification, SimpleGrid, Stack, Text, TextInput } from '@mantine/core';
import { JoiningForm } from '@reusable/settings/JoiningForm';
import { HtmlRenderer } from '@reusable/post/layers/HtmlRenderer';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { parseErrors, subscribe } from 'src/helpers';
import { useNotifications } from '@mantine/notifications';
import { useQueryClient } from 'react-query';
import { Check, X } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        padding: theme.spacing.xl
    },
    title: {
        lineHeight: 1,
    },
}));

const joining_form = {
    "title": "Joining Application Form",
    "description": "Read the conditions carefully before proceeding. We try our best to make our community safe for everyone.",
    "data": [
        { "title": "Messages", "description": "Direct messages you have received from other users" },
        { "title": "Review requests", "description": "Code review requests from your team members" },
        { "title": "Comments", "description": "Daily digest with comments on your posts" },
        {
            "title": "Recommendations",
            "description": "Digest with best community posts from previous week"
        }
    ]
}

const html_rules = `
<p>Welcome to the biggest React job board in the world! This is like Hacker News' Who's Hiring but just for React. Top Level comments must be Job Opportunities.</p>
<ol>
<li><strong>Excessive Self-Promotion :</strong>&nbsp;It&#39;s ok to promote your own content, or content that you&#39;re otherwise vested in, but it should not constitute a majority of your contributions.</li>
<li><strong>Where&#39;s the Javascript? :&nbsp;</strong>&nbsp;Demos can be fun, but they really don&#39;t provide for much discussion unless code is provided as well.</li>
<li><strong>Low-effort content (listicles, memes, etc.) :</strong>&nbsp;Low-effort content such as listicles, memes, clickbait, etc. is prohibited.</li>
<li><strong>Advertising :&nbsp;</strong>Advertising paid products and services is prohibited.</li>
<li><strong>Some Self-promotion OK, Spam not OK :&nbsp;</strong>&nbsp;Per Reddit guidelines for self-promotion, you are definitely welcome to promote your own content as part of your participation in this community, but if you repeatedly post low quality crap you will be banned. If you need further guidelines on spam, see Reddit&#39;s guidelines on Spam.</li>
</ol>
<p>Finally, have fun&nbsp;😁</p>`

export function CJoin() {
    const { classes } = useStyles();
    const navigate = useNavigate();
    const { author } = useParams<"author">();
    const [token, setToken] = useState("")
    const [values, setValues] = useState(Array(joining_form.data.length).fill(false))
    const [loading, setLoading] = useState(false)
    const [joined, setJoined] = useState(false)

    const notifications = useNotifications();
    const queryClient = useQueryClient()

    const handleValues = ({checked, index}: {checked: boolean, index: number}) => {
        const arr = [...values];
        arr[index] = checked;
        setValues([...arr])
    }

    const submit = () => {
        setLoading(true)
        const username = author ? author : ''
        subscribe({ username: username, token: token }).then(res => {
            if (res.error) {
                setLoading(false)
                notifications.showNotification({
                    title: "Error creating the comment!",
                    message: parseErrors(res.error)[0],
                    color: "red",
                    icon: <X size={18} />,
                });
            } else {
                setLoading(false)
                queryClient.invalidateQueries(['community', author])
                setJoined(true)
            }
        })
    }

    const redirectToGroup = () => {
        navigate(`/c/${author}`)
    }

    return (
        <CommunityLayout>
            <SimpleGrid cols={1} spacing={3}>
                <Stack className={classes.card}>
                    <Text size="lg" weight={500} className={classes.title}>
                        Community rules
                    </Text>
                    <HtmlRenderer body={html_rules} id={999} />
                </Stack>
                <Stack className={classes.card}>
                    <Text size="lg" weight={500} className={classes.title}>
                        Joining Code
                    </Text>
                    <Text size="xs" color="dimmed" mt={2}>
                        You need a joining code to join. If you didn't recieve any contact the community admin or moiderators.
                    </Text>
                    <TextInput className='thick-border' placeholder='Code goes here' value={token} onChange={e => setToken(e.target.value)} />
                </Stack>
                <div className={classes.card}>
                    <JoiningForm title={joining_form.title} description={joining_form.description} data={joining_form.data} values={values} handleValues={handleValues} />
                </div>
                <div className={classes.card}>
                    <Button fullWidth disabled={!values.every(v => v === true)} onClick={() => submit()} loading={loading}>
                        I understood the rules, now just let me in !!!
                    </Button>
                </div>
            </SimpleGrid>
            <Modal
                opened={joined}
                centered
                onClose={() => redirectToGroup()}
                title="Successful!"
                withCloseButton={false}
            >
                <Stack>
                    <Notification icon={<Check size={18} />} color="teal" title="Application Granted" disallowClose>
                        You have successfully joined the community. Have fun and follow the rules. Let's create a better community together.
                    </Notification>
                    <Button fullWidth onClick={() => redirectToGroup()}>Return</Button>
                </Stack>
            </Modal>
        </CommunityLayout>
    )
}