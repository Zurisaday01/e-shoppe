import Select from './select';
import useTheme from '../context/theme';
import { Sun, Moon, Monitor } from 'lucide-react';

const SelectTheme = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<Select
			className='w-[110px]'
			onChange={value =>
				toggleTheme((value as Option).value as 'light' | 'dark' | 'system')
			}
			value={{
				value: theme,
				label:
					theme === 'system' ? 'System' : theme === 'light' ? 'Light' : 'Dark',
				icon:
					theme === 'system' ? (
						<Monitor size={16} />
					) : theme === 'light' ? (
						<Sun size={16} />
					) : (
						<Moon size={16} />
					),
			}}
			options={[
				{
					value: 'light',
					label: 'Light',
					icon: <Sun size={16} />,
				},
				{
					value: 'dark',
					label: 'Dark',
					icon: <Moon size={16} />,
				},
				{
					value: 'system',
					label: 'System',
					icon: <Monitor size={16} />,
				},
			]}
		/>
	);
};
export default SelectTheme;
