import { Center, Text } from '@mantine/core'

export function LimitCounter({ count, limit, showText }: { count: number, limit: number, showText?: boolean }) {
    const percentage = Math.round((100 / limit) * count)

    const getColor = () => {
        if (percentage <= 25) return "#12B886"
        else if (percentage <= 50) return "#15AABF"
        else if (percentage <= 75) return "#F76707"
        else if (percentage <= 100) return "#E64980"
        else return "#C92A2A"
    }
    return (
        <Center style={{marginLeft: "auto"}}>
            {showText && (
            <Text size="xs" weight={600} mr={5} color={getColor()}>
                {count}/{limit}
            </Text>
            )}
            <svg width="16" height="16" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" stroke="#5C5F66" strokeWidth="20" />
                <circle strokeDasharray={100} strokeDashoffset={`calc(${100 - percentage})`} cx="60" cy="60" r="54" fill="none" stroke={getColor()} strokeWidth="12" pathLength="100" />
            </svg>
        </Center>
    )
}
