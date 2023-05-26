import Ionicons from '@expo/vector-icons/Ionicons';
import useBoolean from '@src/utils/hooks/useBoolean';
import { navigate } from '@src/navigation';
import colours from '@src/utils/colours';
import { useEffect, useRef, useState } from 'react';
import { KeyboardTypeOptions, StyleProp, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, TextInput, View } from 'react-native';

const TextField = ({
  title,
  titleAlt,
  autoFocus,
  placeholderText,
  style,
  secureInput,
  setValue,
  value,
  autoCapitalize = 'none',
  keyboardType = 'default',
  error = false,
  inputStyle,
  multiline = false,
  onFocus,
  onBlur,
  lupaPass = false,
  disable = false,
}: {
  title?: string;
  titleAlt?: string;
  autoFocus?: boolean;
  placeholderText?: string;
  style?: StyleProp<any>;
  secureInput?: boolean;
  setValue: (val: string) => void;
  value?: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: KeyboardTypeOptions;
  error?: boolean;
  inputStyle?: StyleProp<any>;
  multiline?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  lupaPass?: boolean;
  disable?: boolean;
}) => {
  const { value: active, setValue: setActive } = useBoolean(false);
  const { value: visible, setValue: setVisible } = useBoolean(false);
  const inputRef = useRef<TextInput>(null);

  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (autoFocus) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [autoFocus]);

  return (
    <View style={[style]}>
      {title && (
        <View style={[{ flexDirection: 'row', justifyContent: 'space-between' }]}>
          <Text style={[styles.labelTitle]}>{title}</Text>
          {title === 'Password' && lupaPass && (
            <TouchableOpacity activeOpacity={0.75} onPress={() => navigate('LupaPassword')}>
              <Text style={{ color: colours.redNormal }}>Lupa Password?</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error ? colours.redNormal : active ? colours.greenNormal : colours.black,
            // backgroundColor: disable ? colours.gray700 : colours.backgroundClickable,
          },
          inputStyle,
        ]}>
        {titleAlt && (
          <Text
            style={[
              styles.titleAlt,
              { color: error ? colours.redNormal : active ? colours.greenNormal : colours.black },
            ]}>
            {titleAlt}
          </Text>
        )}
        <TextInput
          placeholder={placeholderText}
          placeholderTextColor={colours.gray300}
          ref={inputRef}
          secureTextEntry={secureInput && !visible}
          onChangeText={(val) => setValue(val)}
          style={[
            styles.inputText,
            {
              width: secureInput ? '84%' : '100%',
              color: disable ? colours.gray300 : colours.black,
            },
          ]}
          value={value ?? value}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          onFocus={() => {
            setActive.true();
            onFocus && onFocus();
          }}
          onBlur={() => {
            setActive.false();
            onBlur && onBlur();
          }}
          multiline={multiline}
          editable={!disable}
        />
        {secureInput && (
          <Ionicons
            size={16}
            name={!visible ? ('eye' as any) : ('eye-off' as any)}
            onPress={() => setVisible.toggle()}
            style={styles.icon}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  labelTitle: {
    fontSize: 16,
    lineHeight: 20,
    paddingBottom: 4,
    color: colours.black,
    fontFamily: 'dm-700',
  },
  titleAlt: {
    left: 12,
    top: -10,
    fontFamily: 'dm',
    position: 'absolute',
    paddingHorizontal: 4,
    backgroundColor: colours.white,
  },
  inputContainer: {
    fontSize: 16,
    lineHeight: 20,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: 'pop',
    justifyContent: 'space-between',
    borderColor: colours.backgroundClickable,
    position: 'relative',
  },
  inputText: {
    fontSize: 14,
    paddingVertical: 8,
    color: colours.black,
    fontFamily: 'dm',
  },
  icon: {
    height: 30,
    width: '12%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  focus: {
    borderColor: colours.greenNormal,
  },
});

export default TextField;
