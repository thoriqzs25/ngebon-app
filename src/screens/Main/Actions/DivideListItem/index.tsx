import SubPage from '@src/components/SubPage';
import TextField from '@src/components/input/TextField';
import colours from '@src/utils/colours';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TextInput } from 'react-native-gesture-handler';
import CustomButton from '@src/components/input/CustomButton';
import { ItemList } from '@src/components/ItemList';
import { InputItem } from '@src/components/InputItem';
import { IS_ANDROID } from '@src/utils/deviceDimensions';
import { navigate } from '@src/navigation';

const DivideListItem = () => {
  const [inputs, setInputs] = useState<Array<{ itemName: string; price: string; qty: string; totalPrice: number }>>([]);
  const [itemConfirmation, setItemConfirmation] = useState<Array<number>>([]);
  const [readyToConfirm, setReadyToConfirm] = useState<boolean>(false);

  const handleAddInput = useCallback(() => {
    setInputs([...inputs, { itemName: '', price: '', qty: '', totalPrice: 0 }]);
  }, [inputs]);

  const handleItemNameChange = useCallback(
    (text: string, index: number) => {
      const newInputs = [...inputs];
      newInputs[index].itemName = text;
      setInputs(newInputs);
    },
    [inputs]
  );

  const handlePriceChange = useCallback(
    (text: string, index: number) => {
      const newInputs = [...inputs];
      newInputs[index].price = text;
      newInputs[index].totalPrice = Number(text) * Number(newInputs[index].qty);
      setInputs(newInputs);
    },
    [inputs]
  );

  const handleQtyChange = useCallback(
    (text: string, index: number) => {
      const newInputs = [...inputs];
      newInputs[index].qty = text;
      newInputs[index].totalPrice = Number(text) * Number(newInputs[index].price);
      setInputs(newInputs);
    },
    [inputs]
  );

  const handleDeleteInput = useCallback(
    (index: number) => {
      const newInputs = [...inputs];
      newInputs.splice(index, 1);
      setInputs(newInputs);
    },
    [inputs]
  );

  const handleEditInput = useCallback(
    (index: number) => {
      const newArr = itemConfirmation.filter((num) => num !== index);

      setItemConfirmation(newArr);
    },
    [inputs, itemConfirmation]
  );

  const handleNext = () => {
    const arr = Array.from({ length: inputs.length }, (_, i) => i);

    setItemConfirmation(arr);
  };

  useEffect(() => {
    setReadyToConfirm(inputs.length === itemConfirmation.length);
    // if () {

    // }
  }, [inputs, itemConfirmation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={IS_ANDROID ? 'height' : 'padding'}
        keyboardVerticalOffset={IS_ANDROID ? -70 : -80}
        style={{ flex: 1 }}>
        <SubPage>
          <View style={{ flex: 1, paddingBottom: moderateVerticalScale(160, -1.5) }}>
            <Text
              style={[styles.dmBold, { fontSize: moderateScale(14, 2), color: colours.greenNormal, marginTop: 12 }]}>
              Divide
            </Text>
            <Text style={[styles.dmBold, { fontSize: moderateScale(16, 2), marginVertical: 8 }]}>List Items</Text>
            <ScrollView style={{ flex: 1, marginBottom: 12 }} showsVerticalScrollIndicator={false}>
              <TextField
                titleAlt='Title'
                setValue={() => null}
                style={{ marginVertical: 12, marginBottom: 16 }}
                inputStyle={{ paddingVertical: 4 }}
              />
              {inputs.map((value, index) => {
                if (itemConfirmation.includes(index))
                  return (
                    <ItemList
                      idx={index + 1}
                      key={index}
                      name={value.itemName}
                      price={value.price}
                      qty={value.qty}
                      totalPrice={value.totalPrice}
                      onEdit={() => handleEditInput(index)}
                      onDelete={() => handleDeleteInput(index)}
                    />
                  );
                return (
                  <InputItem
                    idx={index + 1}
                    key={index}
                    name={value.itemName}
                    price={value.price}
                    qty={value.qty}
                    totalPrice={value.totalPrice}
                    setName={(text) => handleItemNameChange(text, index)}
                    setPrice={(text) => handlePriceChange(text, index)}
                    setQty={(text) => handleQtyChange(text, index)}
                    onDelete={() => handleDeleteInput(index)}
                  />
                );
              })}
            </ScrollView>
            {readyToConfirm && itemConfirmation.length > 0 ? (
              <CustomButton
                text='Confirm'
                style={{ borderRadius: 10, width: '60%', backgroundColor: colours.greenNormal, alignSelf: 'center' }}
                textStyle={{ fontSize: 16 }}
                onPress={() => navigate('DivideChooseFriends')}
              />
            ) : (
              <View
                style={{
                  width: '85%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignSelf: 'center',
                }}>
                <CustomButton
                  style={{ borderRadius: 10, width: '45%', backgroundColor: colours.grayNormal }}
                  textStyle={{ fontSize: 14 }}
                  text='Add another item'
                  onPress={handleAddInput}
                />
                <CustomButton
                  text='Next'
                  style={{ borderRadius: 10, width: '45%' }}
                  textStyle={{ fontSize: 14 }}
                  onPress={() => handleNext()}
                />
              </View>
            )}
          </View>
        </SubPage>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dmBold: {
    fontFamily: 'dm-700',
  },
  dmFont: {
    fontFamily: 'dm',
  },
  box: {
    borderColor: colours.black,
    borderRadius: 8,
    flex: 1,
    height: 44,
    borderWidth: 1,
    position: 'relative',
    padding: 8,
    alignItems: 'center',
    flexDirection: 'row',
  },
  boxTitle: {
    position: 'absolute',
    top: -10,
    left: 12,
    paddingHorizontal: 4,
    backgroundColor: colours.white,
    color: colours.black,
  },
  boxInputText: {
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
    borderBottomColor: colours.black,
    borderBottomWidth: 1,
  },
  boxInputPrice: {
    borderRadius: 6,
    borderColor: colours.placeholderBorder,
    borderWidth: 1,
  },
  input: {
    paddingHorizontal: 2,
    // paddingVertical: 12,
    height: 24,
    marginRight: 4,
  },
});

export default DivideListItem;