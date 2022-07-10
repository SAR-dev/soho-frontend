import { ActivityDataParam } from '@interfaces/activity';
import { NotificationDataParam, Verb } from '@interfaces/notification';
import { createStyles, Group, Skeleton, Text } from '@mantine/core';
import { ClapIcon } from '@reusable/ClapIcon';
import React from 'react'
import { AiFillLike } from 'react-icons/ai';
import { FaAward, FaReplyAll } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getLatestActivity } from 'src/helpers';

const useStyles = createStyles((theme) => ({
    icon: {
        color: theme.colors.blue[5]
    }
}));

export interface DataParam {
    data: {
        results: ActivityDataParam[];
    }
}

export function ActivityBottom() {
    const { author } = useParams<"author">();
    const { classes, cx } = useStyles();

    const { status, data, error, isFetching, isLoading } = useQuery<DataParam, Error>(['activities', author], () => getLatestActivity({username: author}))


    const getIcon = (verb?: string) => {
        if (verb === "clapped") return <ClapIcon size={16} />
        if (verb === "awarded") return <FaAward className={classes.icon} size={16} />
        if (verb === "replied") return <FaReplyAll className={classes.icon} size={16} />
        return <AiFillLike className={classes.icon} size={16} />
    }

    if(isLoading) return (
        <Skeleton height={30} width="100%" />
    )

    return (
        <Group>
            {getIcon(data?.data.results[0].verb)}
            <Text size="xs" lineClamp={1}>
                <Text component='span' size="xs" weight={600} mr={3}>
                    {`${data?.data.results[0].sender.first_name} ${data?.data.results[0].sender.last_name}`}
                </Text>
                {data?.data.results[0].verb} a
                <Text component='span' size="xs" weight={600} ml={3}>{data?.data.results[0].target_type}</Text>
            </Text>
        </Group>
    )
}
