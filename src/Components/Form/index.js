import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import { TextField, MenuItem, } from '@material-ui/core';

const validationSchema = yup.object({
  system_name: yup
    .string('')
    .required('System name is required'),

  type: yup
    .string('')
    .required('Type is required'),

  hdd_capacity: yup
    .number()
    .typeError("Must be a number")
    .required('HDD is required')

});


function Form({ deviceSelected, updateDevice, createDevice }) {
  const formik = useFormik({

    initialValues: {
      system_name: deviceSelected.system_name || '',
      type: deviceSelected.type || '',
      hdd_capacity: deviceSelected.hdd_capacity || ''
    },

    validationSchema: validationSchema,
    onSubmit: (values) => {
      deviceSelected
        ? updateDevice(values, deviceSelected.id)
        : createDevice(values)
    },
  });

  return (

    <div>

      <form
        className='form'
        onSubmit={formik.handleSubmit}
      >
        <div
        >

          <TextField
            fullWidth
            id="system_name"
            name="system_name"
            label="System mame"
            variant="outlined"
            margin="normal"
            value={formik.values.system_name}
            onChange={formik.handleChange}
            error={formik.touched.system_name && Boolean(formik.errors.system_name)}
            helperText={formik.touched.system_name && formik.errors.system_name}
          />
        </div>
        <div>
          <TextField
            fullWidth
            select
            id="type"
            name="type"
            label="Type"
            margin="normal"
            variant="outlined"
            value={formik.values.type}
            defaultValue="DEFAULT"
            onChange={formik.handleChange}
            error={formik.touched.type && Boolean(formik.errors.type)}
            helperText={formik.touched.type && formik.errors.type}
          >
            <MenuItem value="" disabled>Choose one ...</MenuItem>
            <MenuItem value='WINDOWS_WORKSTATION'>Windows Workstation</MenuItem>
            <MenuItem value='WINDOWS_SERVER'>Windows Server</MenuItem>
            <MenuItem value='MAC'>Mac</MenuItem>
          </TextField>
        </div>

        <div>
          <TextField
            fullWidth
            id="hdd_capacity"
            name="hdd_capacity"
            label="HDD Capacity GB"
            margin="normal"
            variant="outlined"
            value={formik.values.hdd_capacity}
            onChange={formik.handleChange}
            error={formik.touched.hdd_capacity && Boolean(formik.errors.hdd_capacity)}
            helperText={formik.touched.hdd_capacity && formik.errors.hdd_capacity}
          />
        </div>

        <Button
          fullWidth
          className='post-button'
          variant="contained"
          type="submit"
          style={{ marginTop: '15px' }}
        >
          {deviceSelected ? 'Save' : 'Add'}
        </Button>

      </form >
    </div >
  );
};

export default Form

