import SubPage from '@src/components/SubPage';
import TextField from '@src/components/input/TextField';
import colours from '@src/utils/colours';
import React, { useCallback, useRef, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import CustomButton from '@src/components/input/CustomButton';
import { ItemList } from '@src/components/ItemList';
import { InputItem } from '@src/components/InputItem';
import { IS_ANDROID } from '@src/utils/deviceDimensions';
import { navigate } from '@src/navigation';
import { store } from '@src/redux/store';
import { setDivideItems, setTaxAndService } from '@src/redux/actions/divide';

const DivideListItem = () => {
  const [inputs, setInputs] = useState<Array<{ itemName: string; price: string; qty: string; totalPrice: number }>>([
    { itemName: '', price: '', qty: '', totalPrice: 0 },
  ]);
  const [itemConfirmation, setItemConfirmation] = useState<boolean>(false);
  const [unfilledItem, setUnfilledItem] = useState<number[]>([]);
  const [title, setTitle] = useState<string>('');
  const [tax, setTax] = useState<number>(0);
  const [service, setService] = useState<number>(0);
  const [valueTax, setValueTax] = useState<string>('');
  const [valueService, setValueService] = useState<string>('');

  const scrollViewRef = useRef<ScrollView>();

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

  const handleNext = () => {
    let isAllFilled = true;
    let unfilled: number[] = [];

    if (inputs.length === 0) {
      isAllFilled = false;
      setInputs([{ itemName: '', price: '', qty: '', totalPrice: 0 }]);
    } else {
      inputs.map((val, idx) => {
        if (val.itemName === '' || val.totalPrice === 0) {
          isAllFilled = false;
          unfilled.push(idx);
        }
      });
    }

    if (isAllFilled === true && title !== '') {
      setItemConfirmation(true);
      setUnfilledItem([]);
    } else setUnfilledItem(unfilled);
  };

  const handleConfirm = () => {
    const _totalAmount = inputs.reduce((accumulator, item) => accumulator + item.totalPrice, 0);

    store.dispatch(setDivideItems({ title: title, items: inputs }));
    store.dispatch(
      setTaxAndService({
        tax: valueTax !== '' ? parseInt(valueTax) : 0,
        service: valueService !== '' ? parseInt(valueService) : 0,
        totalAmount: _totalAmount,
      })
    );
    navigate('DivideChooseFriends');
  };

  const handleConvertPercentageFromTotal = (percentage: number) => {
    let _value = 0;
    inputs.forEach((val) => {
      _value += (val.totalPrice * percentage) / 100;
    });
    return _value;
  };

  // useEffect(() => {
  //   if (tax) {
  //     const valTax = handleConvertPercentageFromTotal(tax);
  //     setValueTax(valTax);
  //   }
  // }, [tax, inputs]);

  // useEffect(() => {
  //   if (service) {
  //     const valService = handleConvertPercentageFromTotal(service);
  //     setValueService(valService);
  //   }
  // }, [service, inputs]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={IS_ANDROID ? 'height' : 'padding'}
        keyboardVerticalOffset={IS_ANDROID ? -70 : -80}
        style={{ flex: 1 }}>
        <SubPage>
          <View style={{ flex: 1, paddingBottom: moderateVerticalScale(40, -1.5) }}>
            <Text
              style={[styles.dmBold, { fontSize: moderateScale(14, 2), color: colours.greenNormal, marginTop: 12 }]}>
              Divide ({itemConfirmation ? 2 : 1}/7)
            </Text>
            <Text style={[styles.dmBold, { fontSize: moderateScale(16, 2), marginVertical: 8 }]}>List Items</Text>
            <Text
              style={[styles.dmBold, { fontSize: moderateScale(12, 2), marginBottom: 10, color: 'rgba(0,0,0,0.5)' }]}>
              {itemConfirmation ? 'Confirm your items' : 'Record items to pay'}
            </Text>
            <ScrollView
              // @ts-ignore
              ref={scrollViewRef}
              style={{ flex: 1, marginBottom: 12 }}
              showsVerticalScrollIndicator={false}>
              <View style={{ backgroundColor: colours.white }}>
                <TextField
                  titleAlt='Debt Title'
                  setValue={setTitle}
                  error={title === ''}
                  style={{ marginVertical: 12, marginBottom: 16, backgroundColor: colours.white }}
                  inputStyle={{ paddingVertical: 4 }}
                />
              </View>
              {inputs.length < 1 && <Text style={{ fontFamily: 'dm-500', color: colours.gray300 }}>Add an item</Text>}
              {inputs.map((value, index) => {
                if (itemConfirmation)
                  return (
                    <ItemList
                      idx={index + 1}
                      key={index}
                      name={value.itemName}
                      price={value.price}
                      qty={value.qty}
                      totalPrice={value.totalPrice}
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
                    error={unfilledItem.includes(index)}
                    setName={(text) => handleItemNameChange(text, index)}
                    setPrice={(text) => handlePriceChange(text, index)}
                    setQty={(text) => handleQtyChange(text, index)}
                    onDelete={() => handleDeleteInput(index)}
                  />
                );
              })}
              {itemConfirmation ? (
                <View style={{ alignSelf: 'flex-end' }}>
                  {valueTax && (
                    <View style={[{ flexDirection: 'row', width: 240 }]}>
                      <Text style={[styles.defaultFont]}>Tax</Text>
                      <Text style={[styles.defaultFont, { marginLeft: 'auto', marginRight: 4 }]}>=</Text>
                      <Text style={[styles.defaultFont, { width: 120 }]}>
                        Rp{parseInt(valueTax)?.toLocaleString('id-ID')}
                      </Text>
                    </View>
                  )}
                  {valueService && (
                    <View style={[{ flexDirection: 'row', width: 240 }]}>
                      <Text style={[styles.defaultFont]}>Service</Text>
                      <Text style={[styles.defaultFont, { marginLeft: 'auto', marginRight: 4 }]}>=</Text>
                      <Text style={[styles.defaultFont, { width: 120 }]}>
                        Rp{parseInt(valueService)?.toLocaleString('id-ID')}
                      </Text>
                    </View>
                  )}
                </View>
              ) : (
                <>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                    <Text style={[{ width: 80 }, styles.defaultFont]}>Tax</Text>
                    {/* <CustomIncrementDecrementButton value={tax} setValue={setTax} /> */}
                    <Text style={[styles.defaultFont, { marginLeft: 16, marginRight: 8 }]}>=</Text>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: colours.black, width: 80 }}>
                      <TextInput
                        value={valueTax}
                        onChangeText={(text: string) => setValueTax(text)}
                        style={[styles.defaultFont, { paddingVertical: 0 }]}
                        keyboardType='number-pad'
                      />
                      {/* <Text style={[styles.defaultFont]}>{valueTax && valueTax > 0 ? valueTax : ''}</Text> */}
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                    <Text style={[{ width: 80 }, styles.defaultFont]}>Service</Text>
                    {/* <CustomIncrementDecrementButton value={service} setValue={setService} /> */}
                    <Text style={[styles.defaultFont, { marginLeft: 16, marginRight: 8 }]}>=</Text>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: colours.black, width: 80 }}>
                      <TextInput
                        value={valueService}
                        onChangeText={(text: string) => setValueService(text)}
                        style={[styles.defaultFont, { paddingVertical: 0 }]}
                        keyboardType='number-pad'
                      />
                      {/* <Text style={[styles.defaultFont]}>
                        {valueService && parseInt(valueService) > 0 ? valueService : ''}
                      </Text> */}
                    </View>
                  </View>
                </>
              )}
            </ScrollView>
            {itemConfirmation ? (
              <View
                style={{
                  width: '85%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignSelf: 'center',
                }}>
                <CustomButton
                  text='Back'
                  style={{ borderRadius: 10, width: '45%', backgroundColor: colours.grayNormal, alignSelf: 'center' }}
                  textStyle={{ fontSize: 14 }}
                  onPress={() => {
                    setItemConfirmation(false);
                  }}
                />
                <CustomButton
                  text='Confirm'
                  style={{ borderRadius: 10, width: '45%', backgroundColor: colours.greenNormal, alignSelf: 'center' }}
                  textStyle={{ fontSize: 14 }}
                  onPress={handleConfirm}
                />
              </View>
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
  defaultFont: {
    fontFamily: 'dm',
    fontSize: 14,
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
