import {
  useApi,
  reactExtension,
  useMetafield,
  useApplyMetafieldsChange,
  TextField,
  useSettings,
  Select,
  useApplyAttributeChange,
  useAttributes,
} from '@shopify/ui-extensions-react/checkout';
import { useState } from 'react';

export default reactExtension(
  'purchase.checkout.delivery-address.render-after',
  () => <Extension />,
);

function Extension() {
  
  const data = useApi();
  const attributes = useAttributes();
  
  const {courier_options} = useSettings();
  const courierOptions = courier_options?.split(",");

  const options = courierOptions.map(option => {
    return { label: option, value: option }
  })

  console.log(attributes);
  console.log("data", data);

  // Define the metafield namespace and key
  const metafieldNamespace = "checkoutCustomFields";
  const rutMetafieldKey = "rut";
  const courierMetafieldKey = "courier";

  const deliveryRut = useMetafield({
    namespace: metafieldNamespace,
    key: rutMetafieldKey,
  });

  const deliveryCourier = useMetafield({
    namespace: metafieldNamespace,
    key: courierMetafieldKey,
  });

  const applyMetafieldsChange = useApplyMetafieldsChange();
  const applyAttributesChange = useApplyAttributeChange();

/*   const options = [
    {label: 'Courtier1', value: 'courier1'},
    {label: 'Courier2', value: 'courier2'},
    {label: 'Courier3', value: 'courier3'},
  ]; */

  return (
    <>
      <TextField 
        label="RUT ej: 12345678-9"
        required
        value={deliveryRut?.value}
        onChange={(value) => {
          console.log("Validar el RUT");

          // Apply the change to the metafield
          applyMetafieldsChange({
            type: "updateMetafield",
            namespace: metafieldNamespace,
            key: rutMetafieldKey,
            valueType: "string",
            value,
          });

          applyAttributesChange({
            type: "updateAttribute",
            key: "RUT",
            value,
          });
        }}
      />

      <Select
        label="Select Courier"
        options={options}
        value={deliveryCourier?.value}
        onChange={(value) => {
          // Apply the change to the metafield
          applyMetafieldsChange({
            type: "updateMetafield",
            namespace: metafieldNamespace,
            key: courierMetafieldKey,
            valueType: "string",
            value,
          });

          applyAttributesChange({
            type: "updateAttribute",
            key: "Courier",
            value,
          });
        }}
      />
    </>
  );
}