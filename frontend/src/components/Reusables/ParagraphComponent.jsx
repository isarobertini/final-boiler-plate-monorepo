import "../../../src/font.css";
import { Fade } from "react-awesome-reveal";
/**
 * Paragraph component with customizable text, additional classes, and an optional category.
 * @param {Object} props - Component props
 * @param {string} props.text - Text content of the paragraph
 * @param {string} props.className - Additional classes to apply to the paragraph
 * @param {string} props.category - Optional category to display in bold before the text
 * @returns {JSX.Element} - Rendered paragraph component
 */
export const ParagraphComponent = ({ text, className, category, ...rest }) => {
    // Default classes that can be customized
    const defaultClasses = 'lg:py-2 text-lg font-josefin-sans max-w-4xl mx-auto';
    return (
        <Fade>
            <p className={`${defaultClasses} ${className}`} {...rest}>
                {category && <span className="font-bold">{category}:</span>} {text}
            </p>
        </Fade>
    );
};
