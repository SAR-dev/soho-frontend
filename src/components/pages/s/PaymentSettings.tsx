import { MeUpdateInterface } from "@interfaces/api";
import { UserDataParam } from "@interfaces/user";
import { Avatar, Button, createStyles, Image, Loader, NumberInput, Progress, Radio, RadioGroup, Select, SimpleGrid, Stack, Text, TextInput } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { ErrorMessage } from "@reusable/ErrorMessage";
import { useEffect, useRef, useState } from "react";
import { MdAdd, MdCheck, MdCopyAll } from "react-icons/md";
import { useQuery, useQueryClient } from "react-query";
import { currencies } from "src/config/stripe";
import { createPaymentCoupon, createPaymentPrice, createPaymentProduct, getLoggedInUser, getPaymentInfo, parseErrors, toBase64, updateLoggedInUser } from "src/helpers";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Check, X } from "tabler-icons-react";
import { useParams } from "react-router-dom";
import { PaymentDataParam } from "@interfaces/payment";
import { EditingComponent } from "./EditingComponet";

const useStyles = createStyles((theme) => ({
    wrapper: {
        display: 'flex',
    },
    w400: {
        width: 400
    },
    uploader: {
        cursor: "pointer",
        width: 150
    }
}));

export function PaymentSettings() {
    const { classes, cx } = useStyles();
    const { author } = useParams<"author">();
    const fileRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState<string[]>([])
    const notifications = useNotifications();
    const queryClient = useQueryClient()

    const [product_image, set_product_image] = useState("")
    const [currency, set_currency] = useState<string | null>("")
    const [unit_amount, set_unit_amount] = useState<number>()
    const [sub_interval, set_sub_interval] = useState("")
    const [percent_off, set_percent_off] = useState<number>()
    const [promotion_code, set_promotion_code] = useState("")
    const [progress, setProgress] = useState(1)

    const [copied, setCopied] = useState(false)
    const [key, setKey] = useState(0)

    const { status, data, error, isFetching, isLoading } = useQuery<PaymentDataParam, Error>(["payment", author], () => getPaymentInfo({ username: author }), {
        onSuccess: res => {
            set_product_image(res.product_image)
            set_currency(res.currency)
            set_unit_amount(res.unit_amount)
            set_promotion_code(res.promotion_code)
            set_percent_off(parseFloat(res.percent_off))
            set_sub_interval(res.sub_interval)
        }
    })

    useEffect(() => {
        const v = []
        if(product_image?.length !== 0){
            v.push(1)
        }
        if(currency?.length !== 0){
            v.push(1)
        }
        if(unit_amount !== 0){
            v.push(1)
        }
        if(promotion_code?.length !== 0){
            v.push(1)
        }
        if(percent_off && Math.ceil(percent_off) !== 0){
            v.push(1)
        }
        if(sub_interval?.length !== 0){
            v.push(1)
        }
        setProgress(v.reduce((a, b) => a + b, 1))
    }, [data])
    

    const onCopy = () => {
        setCopied(true)
        setTimeout(function () { setCopied(false); }, 2500);
    }

    const updateProduct = () => {
        setLoading(true)
        createPaymentProduct({ image: product_image }).then(res => {
            if (res.error) {
                setLoading(false)
                notifications.showNotification({
                    title: "Error occured!",
                    message: parseErrors(res.error)[0],
                    color: "red",
                    icon: <X size={18} />,
                });
            } else {
                setLoading(false)
                notifications.showNotification({
                    title: "Updated",
                    message: "Your data has been updated.",
                    color: "teal",
                    icon: <Check size={18} />,
                    autoClose: 5000,
                });
                queryClient.invalidateQueries(['payment', author])
                setKey(key + 1)
            }
        })
    }

    const updatePrice = () => {
        setLoading(true)
        createPaymentPrice({ currency: currency || "", sub_interval, unit_amount: unit_amount || 0 }).then(res => {
            if (res.error) {
                setLoading(false)
                notifications.showNotification({
                    title: "Error occured!",
                    message: parseErrors(res.error)[0],
                    color: "red",
                    icon: <X size={18} />,
                });
            } else {
                setLoading(false)
                notifications.showNotification({
                    title: "Updated",
                    message: "Your data has been updated.",
                    color: "teal",
                    icon: <Check size={18} />,
                    autoClose: 5000,
                });
                queryClient.invalidateQueries(['payment', author])
                setKey(key + 1)
            }
        })
    }

    const updateCoupon = () => {
        setLoading(true)
        createPaymentCoupon({ percent_off: percent_off || 0 }).then(res => {
            if (res.error) {
                setLoading(false)
                notifications.showNotification({
                    title: "Error occured!",
                    message: parseErrors(res.error)[0],
                    color: "red",
                    icon: <X size={18} />,
                });
            } else {
                setLoading(false)
                notifications.showNotification({
                    title: "Updated",
                    message: "Your data has been updated.",
                    color: "teal",
                    icon: <Check size={18} />,
                    autoClose: 5000,
                });
                queryClient.invalidateQueries(['payment', author])
                setKey(key + 1)
            }
        })
    }

    if (isLoading) return (<Loader color="green" variant="bars" />)

    return (
        <div key={key}>
            {data && (
            <Stack spacing="lg" className={classes.w400}>
                <Stack spacing="xs">
                    <Text weight={700} size="sm">Payment Setup</Text>
                <Progress striped animate value={Math.ceil((progress/7)*100)} label={`${Math.ceil((progress/7)*100)}%`} size="xl" />
                </Stack>
                <EditingComponent image={{ label: "Checkout Image", value: data.product_image, helper: "This image is displayed when someone subscribes community" }}>
                    <Text mb={2}>Logo for your Soho</Text>
                    <Image height={150} width={150} withPlaceholder className={classes.uploader} onClick={() => fileRef?.current?.click()} src={product_image} />
                    <TextInput mt="xs" value={product_image} onChange={event => set_product_image(event.currentTarget.value)} placeholder="Paste image url here..." />
                    <Button variant="light" color="gray" leftIcon={<MdCheck />} mt="xs" loading={loading} fullWidth onClick={() => updateProduct()}>Apply</Button>
                </EditingComponent>
                <EditingComponent elements={[
                    { label: "Currency", value: data.currency ? data.currency.toUpperCase() : "" },
                    { label: "Amount (in unit)", value: data.unit_amount, helper: "This currency will be used when someone subscribes your Soho" },
                    { label: "Charge interval", value: data.sub_interval ? data.sub_interval.toUpperCase() : "", helper: "The time interval for subscription charge." }
                ]}>
                    <Text mb={2}>Select subscription fee (unit amount)</Text>
                    <SimpleGrid cols={2}>
                        <Select
                            placeholder="Currency Type"
                            searchable
                            nothingFound="No options"
                            data={currencies}
                            value={currency?.toUpperCase()}
                            onChange={set_currency}
                        />
                        <NumberInput
                            min={1}
                            placeholder="Currency Amount"
                            value={unit_amount}
                            onChange={e => set_unit_amount(e)}
                        />
                    </SimpleGrid>
                    <Text color="dimmed" size="xs">This currency will be used when someone subscribes your Soho</Text>

                    <Text mb={2} mt="sm">Select charge interval</Text>
                    <RadioGroup value={sub_interval} onChange={set_sub_interval}>
                        <Radio value="week" label="Weekly" />
                        <Radio value="month" label="Monthly" />
                        <Radio value="year" label="Yearly" />
                    </RadioGroup>
                    <Button variant="light" color="gray" leftIcon={<MdCheck />} mt="xs" loading={loading} fullWidth onClick={() => updatePrice()}>Apply</Button>
                </EditingComponent>
                <EditingComponent elements={[
                    { label: "Percent Off", value: data.percent_off },
                    { label: "Promotion Code", value: data.promotion_code.toUpperCase(), helper: "This can be applied when subscribing your community." },
                ]}>
                    <Text mb={2}>Promotion Code</Text>
                    {promotion_code.length !== 0 && (
                        <>
                            <SimpleGrid cols={2}>
                                <Button variant="light" color="gray" leftIcon={<Text size="sm" weight={700}>{percent_off}%</Text>}>84ABVCDGT</Button>
                                <CopyToClipboard text={promotion_code}
                                    onCopy={() => onCopy()}>
                                    {copied ? (
                                        <Button variant="light" color="green">Copied</Button>
                                    ) : (
                                        <Button variant="light" color="gray">Copy Code</Button>
                                    )}
                                </CopyToClipboard>
                            </SimpleGrid>
                            <Button variant="light" color="gray" mt="xs" fullWidth>Change</Button>
                        </>
                    )}
                    <Text mb={2} mt="sm">Write Percentage off amount</Text>
                    <SimpleGrid cols={2}>
                        <NumberInput min={1} placeholder="Percentage Off" value={percent_off} onChange={e => set_percent_off(e)} />
                        <Button variant="light" color="gray" leftIcon={<MdAdd />} loading={loading} fullWidth onClick={() => updateCoupon()}>Generate</Button>
                    </SimpleGrid>
                    <Text color="dimmed" size="xs">Once you generate new promotion code, old ones will expire.</Text>
                </EditingComponent>
                <ErrorMessage errors={errors} />
            </Stack>
            )}
        </div>
    )
}