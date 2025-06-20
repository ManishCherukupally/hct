import { ActionIcon, Button, Card, Container, Flex, Group, Modal, NumberInput, Pagination, ScrollArea, SegmentedControl, SimpleGrid, Space, Stack, Table, Text, Textarea, TextInput, Tooltip } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks';
import React, { useEffect, useRef, useState } from 'react'
import { PiTableFill } from 'react-icons/pi';
import { SlGraph } from "react-icons/sl";
import { Link, useNavigate, useParams } from 'react-router-dom';
import Usertrackchart from '../graphs/Usertrackchart';
import StepCountchart from '../graphs/WaterIntakechart';
import WaterIntakechart from '../graphs/WaterIntakechart';
import Sleepchart from '../graphs/Sleepchart';
import { FaArrowLeft, FaArrowLeftLong } from "react-icons/fa6";
import client from '../../../API/api';
import { useForm } from '@mantine/form';
import { MdDeleteForever, MdEdit, MdSearch } from 'react-icons/md';
import { DateInput, TimeInput } from '@mantine/dates';
import { BiSort } from 'react-icons/bi';
import { RxCross2 } from 'react-icons/rx';

// import TimePicker from 'react-time-picker';



const UserTracker = () => {
    const mediumScreen = useMediaQuery("(min-width: 1200px)");
    const largeScreen = useMediaQuery("(min-width: 1440px)");
    const extraLargeScreen = useMediaQuery("(min-width: 1770px)");
    const phone = useMediaQuery("(max-width: 424px)");


    const username = useParams()
    const navigate = useNavigate()
    const [value, setValue] = useState('table');


    const [recordsPerPage, setRecordsPerPage] = useState(1)

    const [currentPage, setCurrentPage] = useState(1);
    const [loaderVisible, setLoaderVisible] = useState(false);

    const [data, setData] = useState([])
    const [graphdata, setgraphData] = useState([])

    const userId = localStorage.getItem("userId")
    const [recordModal, setrecordModal] = useState(false)
    const [editModal, seteditModal] = useState(false)
    const [deleteModal, setdeleteModal] = useState(false)
    const [date, setDate] = useState(null);
    const [newdate, setnewDate] = useState(null);
    const [nodata, setnoData] = useState(false)
    const sleepRef = useRef();
    const workoutRef = useRef();
    const [inputValue, setInputValue] = useState('');

    const [inputs, setInputs] = useState({
        sleephours: '',
        sleepminutes: '',
        workouthours: '',
        workoutminutes: '',
    })
    console.log(inputs.workouthours);
    console.log(inputs.workoutminutes);

    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });


    const sortedData = React.useMemo(() => {
        // Apply filtering first
        if (data) {
            const filtered = data.filter((item) =>

                (item.date_of_activity && String(item.date_of_activity).toLowerCase().includes(inputValue.toLowerCase())) ||
                (item.day_count && String(item.day_count).toLowerCase().includes(inputValue.toLowerCase())) ||
                (item.step_count && String(item.step_count).toLowerCase().includes(inputValue.toLowerCase())) ||
                (item.water_in_liters && String(item.water_in_liters).toLowerCase().includes(inputValue.toLowerCase())) ||
                (item.hours_of_sleep && String(item.hours_of_sleep).toLowerCase().includes(inputValue.toLowerCase())) ||
                (item.workout_duration && String(item.workout_duration).toLowerCase().includes(inputValue.toLowerCase())) ||
                (item.Exercises && item.Exercises.toLowerCase().includes(inputValue.toLowerCase())) ||
                (item.just_relief_activity && item.just_relief_activity.toLowerCase().includes(inputValue.toLowerCase()))


            );

            // Then apply sorting
            if (!sortConfig.key || sortConfig.direction === '') {
                return filtered.sort((a, b) => b.id - a.id); // Default sorting by ID desc
            }

            return [...filtered].sort((a, b) => {
                const aVal = a[sortConfig.key];
                const bVal = b[sortConfig.key];

                if (typeof aVal === 'string' && typeof bVal === 'string') {
                    return sortConfig.direction === 'asc'
                        ? aVal.localeCompare(bVal)
                        : bVal.localeCompare(aVal);
                }

                if (typeof aVal === 'number' && typeof bVal === 'number') {
                    return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
                }

                if (aVal instanceof Date && bVal instanceof Date) {
                    return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
                }

                return 0;
            });
        }
        else setnoData(true)

    }, [data, inputValue, sortConfig]);

    const handleSort = (key) => {
        setSortConfig((prev) => {
            if (prev.key === key && prev.direction === 'asc') {
                return { key: '', direction: '' }; // reset
            }
            return { key, direction: 'asc' };
        });
    };


    // console.log(new Date(date).toLocaleDateString("en-CA"));
    // const [deleteDate, setdeleteDate] = useState("")
    // console.log(deleteDate);



    const form = useForm({
        initialValues: {

            user_id: "",
            category: "",
            date_of_activity: "",
            new_date_of_activity: "",
            day_count: "",
            step_count: "",
            diet: {},
            Exercises: "",
            water_in_liters: "",
            hours_of_sleep: "",
            workout_duration: "",
            calories_initial: "",
            calories_burn: "",
            just_relief_activity: ""


        },

        validate: {
            date_of_activity: (value) => (value === '' ? 'Please enter a date. This field is required.' : null),
            day_count: (value) => (value === null || '' ? 'Please enter day count. This field is required.' : null),
        },

        transformValues: (values) => ({
            user_id: parseInt(userId),
            category: 1,
            date_of_activity: new Date(date).toLocaleDateString("en-CA"),
            new_date_of_activity: newdate ? new Date(newdate).toLocaleDateString("en-CA") : new Date(date).toLocaleDateString("en-CA"),
            day_count: values.day_count,
            step_count: values.step_count ? values.step_count : 0,
            diet: {},
            Exercises: `${values.Exercises}`,
            water_in_liters: parseFloat(values.water_in_liters ? values.water_in_liters : 0),
            hours_of_sleep: `${inputs.sleephours ? inputs.sleephours : '00'}:${inputs.sleepminutes ? inputs.sleepminutes : '00'}:00`,
            workout_duration: `${inputs.workouthours ? inputs.workouthours : '00'}:${inputs.workoutminutes ? inputs.workoutminutes : '00'}:00`,
            calories_initial: 0,
            calories_burn: 0,
            just_relief_activity: `${values.just_relief_activity}`

        })
    })

    useEffect(() => {
        client.get("user_challenge_records_all/", {
            params: {
                user_id: userId
            },
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("access")}`
            }
        }).then((resp) => {
            setgraphData(resp.data["user_daily_activity_records"])
            if (resp.data.status === 'no_records_found') {
                setnoData(true)
                // setTimeout(() => {
                //     setnoData(false)
                // }, 2500);
            }
        }
        ).catch((err) => {
            console.log(err)
            setgraphData([]);
        });
    }, [loaderVisible])

    useEffect(() => {
        client.get("user_challenge_records/", {
            params: {
                page: currentPage,
                user_id: userId
            },
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("access")}`
            }
        })
            .then((resp) => {
                setData(resp.data["user_daily_activity_records"])
                setRecordsPerPage(resp.data.number_of_pages)
                if (resp.data.status === 'page_not_found') {
                    setnoData(true)
                    // setTimeout(() => {
                    //     setnoData(false)
                    // }, 2500);
                }
            })
            .catch((err) => {
                console.log(err)
                setData([]);
            });
    }, [loaderVisible, currentPage])


    const rows =
        nodata ? (<Text>No records found</Text>) : (
            sortedData.map((item) => (
                <tr key={item.id} style={{ height: 50 }}>
                    <td> {item.date_of_activity} </td>
                    <td> {item.day_count} </td>
                    <td> {item.step_count} </td>
                    <td> {item.water_in_liters} </td>
                    <td> {item.hours_of_sleep} </td>
                    <td> {item.workout_duration}  </td>
                    {/* <td>{item.calories_initial} </td> */}
                    {/* <td>{item.calories_burn} </td> */}
                    {/* <td>
                    {Object.entries(item.diet).map(([key, value]) => (
                        // <div key={key}>{value}</div>
                        <ul style={{ paddingLeft: 20 }}>
                            <li>{value}</li>
                        </ul>
                    ))}
                </td>     */}
                    <td> {item.Exercises} </td>
                    <td> {item.just_relief_activity} </td>

                    <td>
                        <Group>
                            <Tooltip label="Edit"><ActionIcon variant='subtle' onClick={() => {
                                const sleepdata = item.hours_of_sleep
                                const workoutdata = item.workout_duration
                                setInputs({
                                    sleephours: sleepdata.split(":")[0],
                                    sleepminutes: sleepdata.split(":")[1],
                                    workouthours: workoutdata.split(":")[0],
                                    workoutminutes: workoutdata.split(":")[1],
                                })
                                seteditModal(true)
                                const dateObject = new Date(item.date_of_activity);
                                setDate(dateObject);
                                form.setValues({

                                    user_id: userId,
                                    category: 1,
                                    date_of_activity: dateObject,
                                    day_count: item.day_count,
                                    step_count: item.step_count,
                                    diet: {},
                                    Exercises: item.Exercises,
                                    water_in_liters: item.water_in_liters,
                                    hours_of_sleep: item.hours_of_sleep,
                                    workout_duration: item.workout_duration,
                                    calories_initial: 0,
                                    calories_burn: 0,
                                    just_relief_activity: item.just_relief_activity

                                })
                            }}>
                                <MdEdit color="#233c79" /> </ActionIcon></Tooltip>
                            <Tooltip label="Delete"><ActionIcon variant='subtle'
                                onClick={() => {

                                    setDate(item.date_of_activity)
                                    setdeleteModal(true)
                                }}
                            >
                                <MdDeleteForever color="#FF3C5F" /> </ActionIcon></Tooltip>
                        </Group>
                    </td>
                </tr>
            )
            )
        )


    const handleAddrecord = () => {
        setLoaderVisible(true)
        client.post("user_challenge_create_records/", form.getTransformedValues(), {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("access")}`
            }
        })
            .then(resp => {
                if (resp.data.status === "user_tracking_created") {


                    setTimeout(() => {
                        setLoaderVisible(false)
                        setrecordModal(false)
                    }, 1000);
                }
                else {
                    setTimeout(() => {
                        setLoaderVisible(false)
                        // setrecordModal(false)
                    }, 1000);
                }

            })


    }

    const handleEditrecord = () => {
        setLoaderVisible(true)

        client.put("update_user_tracking/", form.getTransformedValues(), {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("access")}`
            }
        })
            .then(resp => {
                // console.log(resp.data);

                if (resp.data.status === "User_tracking_updated") {
                    setTimeout(() => {
                        setLoaderVisible(false)
                        seteditModal(false)
                        setnewDate(null)
                    }, 1000);
                }
                else {
                    setTimeout(() => {
                        setLoaderVisible(false)
                        setrecordModal(false)
                    }, 1000);
                }

            })
    }

    const handleDelete = (deleteDate) => {
        setLoaderVisible(true)

        client.delete("delete_user_activity_record/", {
            params: {
                user_id: userId,
                date_of_activity: deleteDate
            },
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("access")}`
            }
        }).then((resp) => {
            if (resp.data.status === 'user_activity_record_deleted') {
                setTimeout(() => {
                    setLoaderVisible(false)
                    setdeleteModal(false)
                }, 1000);
            }
            else {
                setTimeout(() => {
                    setLoaderVisible(false)
                    setrecordModal(false)
                }, 1000);
            }

        })
    }

    return (
        <div>
            <Container mt={mediumScreen ? "6rem" : "2rem"} size={"xxl"} style={{ zIndex: 150 }}>
                {/* <Modal closeOnClickOutside={false} centered opened={nodata} onClose={() => setnoData(false)} withCloseButton={false}>
                    <Text>There are no records for this client!</Text>
                </Modal> */}

                <Modal centered opened={recordModal} onClose={() => setrecordModal(false)} title="Add Record" closeOnClickOutside={false}>
                    <form onSubmit={handleAddrecord}>
                        <Stack>
                            <DateInput required
                                value={date}
                                onChange={setDate}
                                label="Date"
                                placeholder=" Enter Date"
                            />

                            <NumberInput required
                                label="Day Count"
                                placeholder='Enter Day Count'
                                {...form.getInputProps('day_count')}
                            />

                            <NumberInput
                                label="Step Count"
                                placeholder='Enter Step Count'
                                {...form.getInputProps('step_count')}
                            />

                            <Textarea
                                label="Exercises"
                                placeholder='Enter Exercises'
                                {...form.getInputProps('Exercises')}
                            />

                            <TextInput
                                label="Water in Liters"
                                placeholder='Enter Water in Liters'
                                {...form.getInputProps('water_in_liters')}
                            />

                            {/* <TextInput
                            label="Hours of Sleep"
                            placeholder='Enter Hours of Sleep'
                            {...form.getInputProps('hours_of_sleep')}
                        /> */}
                            <div>
                                <Text style={{ fontWeight: 500, fontSize: '0.875rem', paddingBottom: 5 }}>Hours of Sleep</Text>
                                <Group align="center" >
                                    <Group spacing={'xs'} style={{ flex: 1 }} noWrap>
                                        <TextInput
                                            type='number'
                                            max={12}
                                            min={0}
                                            w="100%"
                                            value={inputs.sleephours}
                                            onChange={(e) => setInputs(prev => ({ ...prev, sleephours: e.target.value }))}
                                        // placeholder="Hours"
                                        />
                                        <Text fz="xs" fw={500}>Hrs</Text>
                                    </Group>
                                    <Text fz="xl" fw={700}>:</Text>
                                    <Group spacing={'xs'} style={{ flex: 1 }} noWrap>
                                        <TextInput
                                            type='number'
                                            max={59}
                                            min={0}
                                            w="100%"
                                            value={inputs.sleepminutes}
                                            onChange={(e) => setInputs(prev => ({ ...prev, sleepminutes: e.target.value }))}
                                        // placeholder="Minutes"
                                        />
                                        <Text fz="xs" fw={500}>Min</Text>
                                    </Group>
                                </Group>
                            </div>

                            <div>
                                <Text style={{ fontWeight: 500, fontSize: '0.875rem', paddingBottom: 5 }}>Workout Duration</Text>
                                <Group align="center">
                                    <Group spacing={'xs'} style={{ flex: 1 }} noWrap>
                                        <TextInput
                                            type='number'
                                            max={12}
                                            min={0}
                                            w="100%"
                                            value={inputs.workouthours}
                                            onChange={(e) => setInputs(prev => ({ ...prev, workouthours: e.target.value }))}
                                        // placeholder="Hours"
                                        />
                                        <Text fz="xs" fw={500}>Hrs</Text>
                                    </Group>
                                    <Text fz="xl" fw={700}>:</Text>
                                    <Group spacing={'xs'} style={{ flex: 1 }} noWrap>
                                        <TextInput
                                            type='number'
                                            max={59}
                                            min={0}
                                            w="100%"
                                            value={inputs.workoutminutes}
                                            onChange={(e) => setInputs(prev => ({ ...prev, workoutminutes: e.target.value }))}
                                        // placeholder="Minutes"
                                        />
                                        <Text fz="xs" fw={500}>Min</Text>
                                    </Group>
                                </Group>
                            </div>
                            {/* 
                        <TimeInput
                            ref={sleepRef}
                            label="Hours of Sleep"
                            placeholder="Enter Hours of Sleep"
                            withSeconds
                            // valueFormat="hh:mm:ss" // force 24-hour format
                            onClick={() => sleepRef.current.showPicker()}
                            {...form.getInputProps('hours_of_sleep')}
                        /> */}


                            {/* 
                        <TimeInput onClick={() => workoutRef.current.showPicker()}
                            ref={workoutRef}
                            
                            withSeconds
                            label="Workout Duration"
                            placeholder="Enter Workout Duration"
                            // value={form.values.Total_workout_duration || ""}
                            // onChange={(val) => form.setFieldValue("Total_workout_duration", val || "")}
                            {...form.getInputProps('workout_duration')}
                        /> */}

                            <Textarea
                                label="Just Relief Activity"
                                placeholder='Enter Relief Activity'
                                {...form.getInputProps('just_relief_activity')}
                            />

                            <Button loading={loaderVisible} style={{ color: "rgba(255, 255, 255, 1)", backgroundColor: "#233c79" }}
                                variant='filled' type='submit'>Done</Button>
                        </Stack>
                    </form>
                </Modal>


                <Modal centered opened={editModal} onClose={() => seteditModal(false)} title="Edit Record" closeOnClickOutside={false}>
                    <form onSubmit={handleEditrecord}>
                        <Stack>
                            <DateInput required
                                value={newdate ? newdate : date}  // Ensure it's using the state value
                                onChange={(value) => setnewDate(value)}
                                label="Date"
                                placeholder=" Enter Date"
                            />

                            <NumberInput required
                                label="Day Count"
                                placeholder='Enter Day Count'
                                {...form.getInputProps('day_count')}
                            />

                            <NumberInput
                                label="Step Count"
                                placeholder='Enter Step Count'
                                {...form.getInputProps('step_count')}
                            />

                            <Textarea
                                label="Exercises"
                                placeholder='Enter Exercises'
                                {...form.getInputProps('Exercises')}
                            />

                            <TextInput
                                label="Water in Liters"
                                placeholder='Enter Water in Liters'
                                {...form.getInputProps('water_in_liters')}
                            />

                            {/* <TextInput
                            label="Hours of Sleep"
                            placeholder='Enter Hours of Sleep'
                            {...form.getInputProps('hours_of_sleep')}
                        /> */}

                            <div>
                                <Text style={{ fontWeight: 500, fontSize: '0.875rem', paddingBottom: 5 }}>Hours of Sleep</Text>
                                <Group align="center">
                                    <Group spacing={'xs'}>
                                        <TextInput
                                            type='number'
                                            max={12}
                                            min={0}
                                            w={'auto'}
                                            value={inputs.sleephours}
                                            onChange={(e) => setInputs(prev => ({ ...prev, sleephours: e.target.value }))}
                                        // placeholder="Hours"
                                        />
                                        <Text fz="xs" fw={500}>Hrs</Text>
                                    </Group>
                                    <Text fz="xl" fw={700}>:</Text>
                                    <Group spacing={'xs'}>
                                        <TextInput
                                            type='number'
                                            max={59}
                                            min={0}
                                            w={'auto'}
                                            value={inputs.sleepminutes}
                                            onChange={(e) => setInputs(prev => ({ ...prev, sleepminutes: e.target.value }))}
                                        // placeholder="Minutes"
                                        />  <Text fz="xs" fw={500}>Min</Text>
                                    </Group>
                                </Group>
                            </div>

                            <div>
                                <Text style={{ fontWeight: 500, fontSize: '0.875rem', paddingBottom: 5 }}>Workout Duration</Text>
                                <Group align="center">
                                    <Group spacing={'xs'}>
                                        <TextInput
                                            type='number'
                                            max={12}
                                            min={0}
                                            w={'auto'}
                                            value={inputs.workouthours}
                                            onChange={(e) => setInputs(prev => ({ ...prev, workouthours: e.target.value }))}
                                        // placeholder="Hours"
                                        />
                                        <Text fz="xs" fw={500}>Hrs</Text>
                                    </Group>
                                    <Text fz="xl" fw={700}>:</Text>
                                    <Group spacing={'xs'}>
                                        <TextInput
                                            type='number'
                                            max={59}
                                            min={0}
                                            w={'auto'}
                                            value={inputs.workoutminutes}
                                            onChange={(e) => setInputs(prev => ({ ...prev, workoutminutes: e.target.value }))}
                                        // placeholder="Minutes"
                                        />  <Text fz="xs" fw={500}>Min</Text>
                                    </Group>
                                </Group>
                            </div>

                            {/* <TimeInput onClick={() => sleepRef.current.showPicker()}
                            ref={sleepRef}
                            withSeconds
                            label="Hours of Sleep"
                            placeholder="Enter Hours of Sleep"
                            // value={form.values.Total_workout_duration || ""}
                            // onChange={(val) => form.setFieldValue("Total_workout_duration", val || "")}
                            {...form.getInputProps('hours_of_sleep')}
                        />
                        <TimeInput onClick={() => workoutRef.current.showPicker()}
                            ref={workoutRef}
                            withSeconds
                            label="Workout Duration"
                            placeholder="Enter Workout Duration"
                            // value={form.values.Total_workout_duration || ""}
                            // onChange={(val) => form.setFieldValue("Total_workout_duration", val || "")}
                            {...form.getInputProps('workout_duration')}
                        /> */}

                            <Textarea
                                label="Just Relief Activity"
                                placeholder='Enter Relief Activity'
                                {...form.getInputProps('just_relief_activity')}
                            />

                            <Button loading={loaderVisible} style={{ color: "rgba(255, 255, 255, 1)", backgroundColor: "#233c79" }}
                                variant='filled' type='submit' >Edit</Button>
                        </Stack>
                    </form>
                </Modal>

                <Modal centered opened={deleteModal} onClose={() => setdeleteModal(false)} title='Are you sure?'>
                    <Text>Do you really want to delete this record?</Text>

                    <Flex justify={"end"}>
                        <Button loading={loaderVisible} style={{ color: "rgba(255, 255, 255, 1)", backgroundColor: "#233c79" }}
                            variant='filled' onClick={() => handleDelete(date)}>Done</Button>
                    </Flex>
                </Modal>

                <Flex justify={"space-between"}>
                    <Group align={"center"} gap={2}>
                        <Link to={-1}>
                            <FaArrowLeftLong color='gray' />
                        </Link>
                        {/* <ActionIcon onClick={() => navigate()}></ActionIcon> */}
                        <Text fz={22} fw={600}>{mediumScreen ? username.username : username.username.split(" ")[0]}</Text>
                    </Group>
                    <Group>
                        {value === 'table' && <TextInput w={"8rem"}
                            radius={10}
                            rightSection={inputValue ? (<ActionIcon onClick={() => setInputValue('')}><RxCross2 /></ActionIcon>) : (null)}
                            icon={<MdSearch />} placeholder='Search here'
                            value={inputValue} onChange={(event) => {
                                const value = event.currentTarget.value;
                                setInputValue(value);
                                // setisSearching(value.trim() !== '');

                            }} />}
                        <Button radius={10} style={{ backgroundColor: "#233c79" }}
                            onClick={() => {
                                setrecordModal(true)
                                form.reset()
                                setDate(null);
                                setInputs({
                                    sleephours: '',
                                    sleepminutes: '',
                                    workouthours: '',
                                    workoutminutes: '',
                                })
                            }}> Add Record  </Button>

                        <SegmentedControl w={mediumScreen ? "10rem" : "5rem"}
                            size={mediumScreen ? "md" : "sm"}
                            value={value}
                            onChange={setValue}
                            data={[
                                { label: <PiTableFill />, value: 'table' },
                                { label: <SlGraph />, value: 'graph' },

                            ]}
                        />
                    </Group>
                </Flex>
                <Space h={15} />


                {
                    value === 'table' ? (
                        <Card withBorder radius={10} shadow='md'>
                            {mediumScreen ? (
                                <Table striped >
                                    <thead style={{
                                        position: "sticky",
                                        top: 0,
                                        background: 'white', zIndex: 6,
                                    }}>
                                        <tr>
                                            <th style={{ width: 'auto' }}>
                                                <Flex gap={10} align={'center'}>
                                                    <Text c={'dark'} fz={14} fw={500}>Date</Text>
                                                    <ActionIcon onClick={() => handleSort('date_of_activity')}><BiSort /></ActionIcon>
                                                </Flex>
                                            </th>

                                            <th style={{ width: 'auto' }}>
                                                <Flex gap={10} align={'center'}>
                                                    <Text c={'dark'} fz={14} fw={500}>Day Count</Text>
                                                    <ActionIcon onClick={() => handleSort('day_count')}><BiSort /></ActionIcon>
                                                </Flex>
                                            </th>

                                            <th style={{ width: 'auto' }}>
                                                <Flex gap={10} align={'center'}>
                                                    <Text c={'dark'} fz={14} fw={500}>Step Count</Text>
                                                    <ActionIcon onClick={() => handleSort('step_count')}><BiSort /></ActionIcon>
                                                </Flex>
                                            </th>

                                            <th style={{ width: 'auto' }}>
                                                <Flex gap={10} align={'center'}>
                                                    <Text c={'dark'} fz={14} fw={500}>Water in Liters</Text>
                                                    <ActionIcon onClick={() => handleSort('water_in_liters')}><BiSort /></ActionIcon>
                                                </Flex>
                                            </th>

                                            <th style={{ width: 'auto' }}>
                                                <Flex gap={10} align={'center'}>
                                                    <Text c={'dark'} fz={14} fw={500}>Hours of Sleep</Text>
                                                    <ActionIcon onClick={() => handleSort('hours_of_sleep')}><BiSort /></ActionIcon>
                                                </Flex>
                                            </th>

                                            <th style={{ width: 'auto' }}>
                                                <Flex gap={10} align={'center'}>
                                                    <Text c={'dark'} fz={14} fw={500}>Workout Duration</Text>
                                                    <ActionIcon onClick={() => handleSort('workout_duration')}><BiSort /></ActionIcon>
                                                </Flex>
                                            </th>

                                            <th style={{ width: 'auto' }}>
                                                <Flex gap={10} align={'center'}>
                                                    <Text c={'dark'} fz={14} fw={500}>Exercises</Text>
                                                    <ActionIcon onClick={() => handleSort('Exercises')}><BiSort /></ActionIcon>
                                                </Flex>
                                            </th>

                                            <th style={{ width: 'auto' }}>
                                                <Flex gap={10} align={'center'}>
                                                    <Text c={'dark'} fz={14} fw={500}>Just Relief Activity</Text>
                                                    <ActionIcon onClick={() => handleSort('just_relief_activity')}><BiSort /></ActionIcon>
                                                </Flex>
                                            </th>



                                            {/* <th> Date </th>
                                            <th> Day Count </th>
                                            <th> Step Count </th>
                                            <th> Water in Liters </th>
                                            <th> Hours of Sleep </th>
                                            <th> Workout Duration  </th> */}
                                            {/* <th> Calories Initial </th> */}
                                            {/* <th>Calories Burn </th> */}
                                            {/* <th> Diet </th> */}
                                            {/* <th> Exercises </th>
                                            <th> Just Relief Activity </th> */}
                                            <th> Action </th>

                                        </tr>
                                    </thead>
                                    <tbody>{rows}</tbody>

                                    {/* {
                                    nodata ? (
                                        <Text align="center">No records found</Text>
                                    ) : (
                                        <tbody>{rows}</tbody>
                                    )
                                } */}

                                    {/* <tbody>
                                    <tr >
                                        <td>Name</td>
                                    </tr>
                                </tbody> */}
                                </Table>
                            ) : (
                                <ScrollArea offsetScrollbars h={400} >
                                    <Table striped >
                                        <thead style={{
                                            position: "sticky",
                                            top: 0,
                                            background: 'white', zIndex: 6,
                                        }}>
                                            <tr>
                                                <th style={{ width: 'auto' }}>
                                                    <Flex gap={10} align={'center'}>
                                                        <Text c={'dark'} fz={14} fw={500}>Date</Text>
                                                        <ActionIcon onClick={() => handleSort('date_of_activity')}><BiSort /></ActionIcon>
                                                    </Flex>
                                                </th>

                                                <th style={{ width: 'auto' }}>
                                                    <Flex gap={10} align={'center'}>
                                                        <Text c={'dark'} fz={14} fw={500}>Day Count</Text>
                                                        <ActionIcon onClick={() => handleSort('day_count')}><BiSort /></ActionIcon>
                                                    </Flex>
                                                </th>

                                                <th style={{ width: 'auto' }}>
                                                    <Flex gap={10} align={'center'}>
                                                        <Text c={'dark'} fz={14} fw={500}>Step Count</Text>
                                                        <ActionIcon onClick={() => handleSort('step_count')}><BiSort /></ActionIcon>
                                                    </Flex>
                                                </th>

                                                <th style={{ width: 'auto' }}>
                                                    <Flex gap={10} align={'center'}>
                                                        <Text c={'dark'} fz={14} fw={500}>Water in Liters</Text>
                                                        <ActionIcon onClick={() => handleSort('water_in_liters')}><BiSort /></ActionIcon>
                                                    </Flex>
                                                </th>

                                                <th style={{ width: 'auto' }}>
                                                    <Flex gap={10} align={'center'}>
                                                        <Text c={'dark'} fz={14} fw={500}>Hours of Sleep</Text>
                                                        <ActionIcon onClick={() => handleSort('hours_of_sleep')}><BiSort /></ActionIcon>
                                                    </Flex>
                                                </th>

                                                <th style={{ width: 'auto' }}>
                                                    <Flex gap={10} align={'center'}>
                                                        <Text c={'dark'} fz={14} fw={500}>Workout Duration</Text>
                                                        <ActionIcon onClick={() => handleSort('workout_duration')}><BiSort /></ActionIcon>
                                                    </Flex>
                                                </th>

                                                <th style={{ width: 'auto' }}>
                                                    <Flex gap={10} align={'center'}>
                                                        <Text c={'dark'} fz={14} fw={500}>Exercises</Text>
                                                        <ActionIcon onClick={() => handleSort('Exercises')}><BiSort /></ActionIcon>
                                                    </Flex>
                                                </th>

                                                <th style={{ width: 'auto' }}>
                                                    <Flex gap={10} align={'center'}>
                                                        <Text c={'dark'} fz={14} fw={500}>Just Relief Activity</Text>
                                                        <ActionIcon onClick={() => handleSort('just_relief_activity')}><BiSort /></ActionIcon>
                                                    </Flex>
                                                </th>
                                                <th> Action </th>

                                            </tr>
                                        </thead>
                                        <tbody>{rows}</tbody>

                                        {/* {
                                    nodata ? (
                                        <Text align="center">No records found</Text>
                                    ) : (
                                        <tbody>{rows}</tbody>
                                    )
                                } */}

                                        {/* <tbody>
                                    <tr >
                                        <td>Name</td>
                                    </tr>
                                </tbody> */}
                                    </Table>
                                </ScrollArea>
                            )}
                            <Space h={"xl"} />
                            < Flex justify={"end"}>
                                <Pagination value={currentPage} onChange={setCurrentPage} total={recordsPerPage} color="yellow" siblings={1} />
                            </Flex>
                        </Card>
                    ) : (
                        <>
                            {
                                graphdata ? (

                                    <>
                                        {
                                            mediumScreen ? (
                                                <>
                                                    <SimpleGrid cols={2}>
                                                        <Card withBorder radius={"md"} shadow='md'>
                                                            <WaterIntakechart data={graphdata} />
                                                        </Card>

                                                        <Card withBorder radius={"md"} shadow='md'>
                                                            <Sleepchart data={graphdata} />
                                                        </Card>
                                                    </SimpleGrid>
                                                    <Space h={15} />
                                                    <Card withBorder radius={"md"} mb={"1rem"} shadow='md'>
                                                        <Usertrackchart data={graphdata} />
                                                    </Card>
                                                </>
                                            ) : (
                                                <>
                                                    <Card withBorder radius={"md"} shadow='md' mb={"md"}>
                                                        <ScrollArea w="100%" offsetScrollbars scrollX scrollY={false}>
                                                            <div style={{ minWidth: "600px", display: "inline-block" }}>
                                                                <WaterIntakechart data={graphdata} />
                                                            </div>
                                                        </ScrollArea>
                                                    </Card>

                                                    <Card withBorder radius={"md"} shadow='md' mb={"md"}>
                                                        <ScrollArea w="100%" offsetScrollbars scrollX scrollY={false}>
                                                            <div style={{ minWidth: "600px", display: "inline-block" }}>
                                                                <Sleepchart data={graphdata} />
                                                            </div>
                                                        </ScrollArea>
                                                    </Card>

                                                    <Card withBorder radius={"md"} shadow='md' mb={"md"}>
                                                        <ScrollArea w="100%" offsetScrollbars scrollX scrollY={false}>
                                                            <div style={{ minWidth: "600px", display: "inline-block" }}>
                                                                <Usertrackchart data={graphdata} />
                                                            </div>
                                                        </ScrollArea>
                                                    </Card>
                                                </>
                                            )
                                        }

                                    </>
                                ) : (<Text>No data found!</Text>)
                            }

                        </>
                    )
                }

            </Container>
        </div >
    )
}

export default UserTracker
