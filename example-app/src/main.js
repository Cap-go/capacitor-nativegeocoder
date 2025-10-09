
import './style.css';
import { NativeGeocoder } from '@capgo/nativegeocoder';

const plugin = NativeGeocoder;
const state = {};


const actions = [
{
              id: 'forward-geocode',
              label: 'Forward geocode',
              description: 'Converts an address into coordinates. Provide a Google Maps API key when running on web.',
              inputs: [{ name: 'addressString', label: 'Address', type: 'text', value: 'Paris, France' }, { name: 'maxResults', label: 'Max results', type: 'number', value: 3 }, { name: 'apiKey', label: 'Google Maps API key (web)', type: 'text', placeholder: 'YOUR_API_KEY' }],
              run: async (values) => {
                const addressString = values.addressString || '';
if (!addressString) {
  throw new Error('Provide an address.');
}
const options = { addressString };
if (!Number.isNaN(Number(values.maxResults)) && values.maxResults !== null && values.maxResults !== '') {
  options.maxResults = Number(values.maxResults);
}
if (values.apiKey) {
  options.apiKey = values.apiKey;
}
return await plugin.forwardGeocode(options);
              },
            },
{
              id: 'reverse-geocode',
              label: 'Reverse geocode',
              description: 'Converts latitude/longitude into an address.',
              inputs: [{ name: 'latitude', label: 'Latitude', type: 'number', value: 48.8566 }, { name: 'longitude', label: 'Longitude', type: 'number', value: 2.3522 }, { name: 'maxResults', label: 'Max results', type: 'number', value: 3 }, { name: 'apiKey', label: 'Google Maps API key (web)', type: 'text', placeholder: 'YOUR_API_KEY' }],
              run: async (values) => {
                const latitude = Number(values.latitude);
const longitude = Number(values.longitude);
if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
  throw new Error('Provide numeric latitude and longitude.');
}
const options = { latitude, longitude };
if (!Number.isNaN(Number(values.maxResults)) && values.maxResults !== null && values.maxResults !== '') {
  options.maxResults = Number(values.maxResults);
}
if (values.apiKey) {
  options.apiKey = values.apiKey;
}
return await plugin.reverseGeocode(options);
              },
            }
];

const actionSelect = document.getElementById('action-select');
const formContainer = document.getElementById('action-form');
const descriptionBox = document.getElementById('action-description');
const runButton = document.getElementById('run-action');
const output = document.getElementById('plugin-output');

function buildForm(action) {
  formContainer.innerHTML = '';
  if (!action.inputs || !action.inputs.length) {
    const note = document.createElement('p');
    note.className = 'no-input-note';
    note.textContent = 'This action does not require any inputs.';
    formContainer.appendChild(note);
    return;
  }
  action.inputs.forEach((input) => {
    const fieldWrapper = document.createElement('div');
    fieldWrapper.className = input.type === 'checkbox' ? 'form-field inline' : 'form-field';

    const label = document.createElement('label');
    label.textContent = input.label;
    label.htmlFor = `field-${input.name}`;

    let field;
    switch (input.type) {
      case 'textarea': {
        field = document.createElement('textarea');
        field.rows = input.rows || 4;
        break;
      }
      case 'select': {
        field = document.createElement('select');
        (input.options || []).forEach((option) => {
          const opt = document.createElement('option');
          opt.value = option.value;
          opt.textContent = option.label;
          if (input.value !== undefined && option.value === input.value) {
            opt.selected = true;
          }
          field.appendChild(opt);
        });
        break;
      }
      case 'checkbox': {
        field = document.createElement('input');
        field.type = 'checkbox';
        field.checked = Boolean(input.value);
        break;
      }
      case 'number': {
        field = document.createElement('input');
        field.type = 'number';
        if (input.value !== undefined && input.value !== null) {
          field.value = String(input.value);
        }
        break;
      }
      default: {
        field = document.createElement('input');
        field.type = 'text';
        if (input.value !== undefined && input.value !== null) {
          field.value = String(input.value);
        }
      }
    }

    field.id = `field-${input.name}`;
    field.name = input.name;
    field.dataset.type = input.type || 'text';

    if (input.placeholder && input.type !== 'checkbox') {
      field.placeholder = input.placeholder;
    }

    if (input.type === 'checkbox') {
      fieldWrapper.appendChild(field);
      fieldWrapper.appendChild(label);
    } else {
      fieldWrapper.appendChild(label);
      fieldWrapper.appendChild(field);
    }

    formContainer.appendChild(fieldWrapper);
  });
}

function getFormValues(action) {
  const values = {};
  (action.inputs || []).forEach((input) => {
    const field = document.getElementById(`field-${input.name}`);
    if (!field) return;
    switch (input.type) {
      case 'number': {
        values[input.name] = field.value === '' ? null : Number(field.value);
        break;
      }
      case 'checkbox': {
        values[input.name] = field.checked;
        break;
      }
      default: {
        values[input.name] = field.value;
      }
    }
  });
  return values;
}

function setAction(action) {
  descriptionBox.textContent = action.description || '';
  buildForm(action);
  output.textContent = 'Ready to run the selected action.';
}

function populateActions() {
  actionSelect.innerHTML = '';
  actions.forEach((action) => {
    const option = document.createElement('option');
    option.value = action.id;
    option.textContent = action.label;
    actionSelect.appendChild(option);
  });
  setAction(actions[0]);
}

actionSelect.addEventListener('change', () => {
  const action = actions.find((item) => item.id === actionSelect.value);
  if (action) {
    setAction(action);
  }
});

runButton.addEventListener('click', async () => {
  const action = actions.find((item) => item.id === actionSelect.value);
  if (!action) return;
  const values = getFormValues(action);
  try {
    const result = await action.run(values);
    if (result === undefined) {
      output.textContent = 'Action completed.';
    } else if (typeof result === 'string') {
      output.textContent = result;
    } else {
      output.textContent = JSON.stringify(result, null, 2);
    }
  } catch (error) {
    output.textContent = `Error: ${error?.message ?? error}`;
  }
});

populateActions();
