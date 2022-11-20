import { createStyles, Loader, Stack } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { useQuery, useQueryClient } from "react-query";
import { getPaymentPayee, getPaymentPayor } from "src/helpers";
import { useParams } from "react-router-dom";
import { PaymentDataParam } from "@interfaces/payment";

const useStyles = createStyles((theme) => ({
    wrapper: {
        display: 'flex',
    },
    w400: {
        width: 400
    },
}));

export function Earnings() {
    const { classes, cx } = useStyles();
    const notifications = useNotifications();
    const queryClient = useQueryClient()
    const { status, data, error, isFetching, isLoading } = useQuery<PaymentDataParam, Error>(["subscriptions"], () => getPaymentPayee())

    if (isLoading) return (<Loader color="green" variant="bars" />)

    return (
        <div>
            {data && (
            <Stack spacing="lg" className={classes.w400}>
                
            </Stack>
            )}
        </div>
    )
}